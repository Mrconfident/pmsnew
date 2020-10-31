var express = require('express');
var router = express.Router();
var  bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
exports.checkLoginUser=(req,res,next)=>{

    var userToken=localStorage.getItem('userToken');
    try {
      var decoded = jwt.verify(userToken, 'loginToken');
    } catch(err) {
      res.redirect('/');
    }
    next();
  }
  exports.checkEmail=(req,res,next)=>{
    const email=req.body.email;
    var checkexistemail=userModule.findOne({
      email:email
    });
    checkexistemail.exec((err,data)=>{
        if(err)
        {
          throw err;
        }
        if(data)
        {
          return res.render('signup',{
            title:'Password Management System',
            msg:'Email Already Exist',
          });
        }
        next();
    });
  }
  
  exports.checkUname=(req,res,next)=>{
    const uname=req.body.uname;
    var checkexistuname=userModule.findOne({
      username:uname
    });
    checkexistuname.exec((err,data)=>{
        if(err)
        {
          throw err;
        }
        if(data){
          return res.render('signup',{
            title:'Password Management System',
            msg:'Username Already Exist',
          });
        }
        next();
    });
  }
  
