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
    getAllPass.exec((err,data)=>{
        if(err) throw err;
        res.render('view-all-password',{
          title:'Password Management System',
          loginUser:loginUser,
          records:data
        });
    });
  });

  module.exports=router;