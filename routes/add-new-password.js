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
    getPassCat.exec((err,data)=>{
        if(err) throw err;
        res.render('add-new-password',{
          title:'Password Management System',
          loginUser:loginUser,
          records:data,
          success:''
        });
    });
  });
  
  router.post('/',checkLoginUser,(req,res,next)=>{
    var loginUser=localStorage.getItem('loginUser');
    var pass_cat=req.body.pass_cat;
    var project_name=req.body.project_name;
    var pass_details=req.body.pass_details;
    var password_details=new passModule({
      password_category:pass_cat,
      project_name:project_name,
      password_detail:pass_details
    });
        password_details.save((err,data)=>{
            getPassCat.exec((err,data)=>{
                if(err) throw err;
                 res.render('add-new-password',{
                         title:'Password Management System',
                        loginUser:loginUser,
                      records:data,
                    success:'Password Details added Successfully'
                  });
             });
          });
  });
  
  module.exports=router;