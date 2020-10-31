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


router.get('/',checkLoginUser,(req,res,next)=>{
    var loginUser=localStorage.getItem('loginUser');
    res.render('addNewCategory',{
      title:'Password Management System',
      loginUser:loginUser,
      errors:'',
      success:''
    });
  });
  
  router.post('/',checkLoginUser,[ (check('passwordCategory','Enter Password Category Name').isLength({ min:1}))],(req,res,next)=>{
    var loginUser=localStorage.getItem('loginUser');
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
      res.render('addNewCategory',{
        title:'Password Management System',
        loginUser:loginUser,
        errors:errors.mapped(),
        success:''
      });
    }
    else
    {
      var passCatName=req.body.passwordCategory;
      var passCatDetails=new passCateModule({
        password_category:passCatName
      });
      passCatDetails.save((err,doc)=>{
          if(err) throw err;
          res.render('addNewCategory',{
            title:'Password Management System',
            loginUser:loginUser,
            errors:'',
            success:'Password Category Added Successfully'
          });
      }); 
   }
  });

  module.exports=router;
  