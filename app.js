const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const dashboardRouter = require('./routes/dashboard');
const addNewCateRouter = require('./routes/add-new-category');
const addNewPassRouter=require('./routes/add-new-password');
const viewAllPassRouter=require('./routes/view-all-password');
const viewPassCateRouter = require('./routes/passwordCategory');
const passwordDetailRouter=require('./routes/password-detail');
const join=require('./routes/join');

const usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dashboard',dashboardRouter);
app.use('/add-new-category',addNewCateRouter);
app.use('/passwordCategory',viewPassCateRouter);
app.use('/add-new-password',addNewPassRouter);
app.use('/view-all-password',viewAllPassRouter);
app.use('/password-detail',passwordDetailRouter);
app.use('/join',join);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
