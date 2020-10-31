var express = require('express');
var router = express.Router();
var  bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
const userModule=require('../modules/user');
const passCateModule=require('../modules/password_category');
const passModule=require('../modules/add_password');
const {check, validationResult } = require('express-validator');
const {checkUname,checkEmail,checkLoginUser}=require('../controller/index');
var getPassCat=passCateModule.find({});
var getAllPass=passModule.find({});


if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  if(loginUser)
  {
      res.redirect('./dashboard');
  }
  else{
  res.render('index', { title: 'Password Management System',msg:''});
  }
});

router.post('/', function(req, res, next) {
  var username=req.body.uname;
  var password=req.body.password;
  const checkUser=userModule.findOne({username:username});
  checkUser.exec((err,data)=>{
      if(err) throw err;
      var getUserID=data._id;
      var getPassword=data.password;
      if(bcrypt.compareSync(password,getPassword)){
        var token = jwt.sign({ userID: getUserID }, 'loginToken');
        localStorage.setItem('userToken', token);
        localStorage.setItem('loginUser',username);
          res.redirect('/dashboard');
      }
      else{
      res.render('index', { title: 'Password Management System',msg:'Username and password not matched'});
      }
    });
  
});


router.get('/signup',(req,res,next)=>{
  var loginUser=localStorage.getItem('loginUser');
  if(loginUser)
  {
      res.redirect('./dashboard');
  }
  else{
      res.render('signup',{
        title:'Password Management System',
        msg:''
      });
    }
});

router.post('/signup',checkUname,checkEmail,(req,res,next)=>{
    const username=req.body.uname;
    const email=req.body.email;
    var password=req.body.password;
    const confpassword=req.body.confpassword;
    if(password!==confpassword)
    {
      return res.render('signup',{
        title:'Password Management System',
        msg:'Password not matched'
      });
    }
    else{
      password=bcrypt.hashSync(password,10);
      const userDetail=new userModule({
        username:username,
        email:email,
        password:password
      });
      userDetail.save((err,doc)=>{
        if(err)
        {
          throw err;
        }
        else
        {
          res.render('signup',{
            title:'Password Management System',
            msg:'User Registered Succesfully'
          });
        }
      });
    }
  });








router.get('/logout',(req,res,next)=>{
  localStorage.removeItem('loginUser');
  localStorage.removeItem('userToken')
  res.redirect('/');
});

module.exports = router;
