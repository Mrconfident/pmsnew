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
    res.redirect('/dashboard');
  });
  
  router.get('/edit/:id',checkLoginUser,(req,res,next)=>{
    var loginUser=localStorage.getItem('loginUser');
    var id=req.params.id;
    var getPassDetails=passModule.findById({_id:id});
    getPassDetails.exec((err,data)=>{
        if(err) throw err;
        getPassCat.exec((err,data1)=>{
        res.render('edit_password_detail',{
          title:'Password Management System',
          loginUser:loginUser,
          records:data1,
          record:data,
          success:''
        });
      });
    });
  });
  
  router.post('/edit/:id',checkLoginUser,(req,res,next)=>{
    var loginUser=localStorage.getItem('loginUser');
    var id=req.params.id;
    var passcat=req.body.pass_cat;
    var project_name=req.body.project_name;
    var pass_details=req.body.pass_details;
    passModule.findByIdAndUpdate(id,{password_category:passcat,project_name:project_name,password_detail:pass_details}).exec((err)=>{
       if(err) throw err;
        var getPassDetails=passModule.findById({_id:id});
        getPassDetails.exec((err,data)=>{
            if(err) throw err;
           getPassCat.exec((err,data1)=>{
            res.render('edit_password_detail',{
              title:'Password Management System',
              loginUser:loginUser,
              records:data1,
              record:data,
              success:'Password Updated Successfully'
           });
          });
        });
    });
  });
  
  
  
  router.get('/delete/:id',checkLoginUser,(req,res,next)=>{
    var loginUser=localStorage.getItem('loginUser');
    var id=req.params.id;
    var passdelete=passModule.findByIdAndDelete(id);
  
    passdelete.exec(function(err){
      if(err) throw err;
      res.redirect('/view-all-password')
    }); 
  });
  

module.exports=router;