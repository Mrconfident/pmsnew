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
    getPassCat.exec(function(err,data){
      if(err) throw err;
      res.render('password_category',{
        title:'Password Management System',
        loginUser:loginUser,
        records:data
      });
    }); 
});

router.get('/delete/:id',checkLoginUser,(req,res,next)=>{
var loginUser=localStorage.getItem('loginUser');
var passcat_id=req.params.id;
var passdelete=passCateModule.findByIdAndDelete(passcat_id);

passdelete.exec(function(err){
  if(err) throw err;
  res.redirect('/passwordCategory')
}); 
});

router.get('/edit/:id',checkLoginUser,(req,res,next)=>{
var loginUser=localStorage.getItem('loginUser');
var passcat_id=req.params.id;
var getpassCategory=passCateModule.findById(passcat_id);

getpassCategory.exec(function(err,data){
  if(err) throw err;
  res.render('edit_pass_category',{
    title:'Password Management System',
    loginUser:loginUser,
    records:data,
    success:'',
    errors:'',
    id:passcat_id
  });
}); 
});

router.post('/edit',checkLoginUser,(req,res,next)=>{
var loginUser=localStorage.getItem('loginUser');
var passcat_id=req.body.id;
var passwordCategory=req.body.passwordCategory;
var update_passCat=passCateModule.findByIdAndUpdate(passcat_id,{password_category:passwordCategory});
update_passCat.exec(function(err,doc){
  if(err) throw err;
  res.redirect('/passwordCategory')
}); 
});


  module.exports=router;