var createError = require('http-errors');
var express = require('express');
var path = require('path');
var User = require('./models/user')

var logger = require('morgan');
var bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter)

//reuqire the mongoose package
var mongoose = require('mongoose')
//get mongodb url
var mongoDB = 'mongodb://localhost:27017/information'
//connet the database
mongoose.connect(mongoDB)
//reference the database from the mongoose connection
mongoose.connection.on('connected', function () {
  console.log('connect mongodb cuccess')
})
mongoose.connection.on('error', function () {
  console.log('connect mongodb error')
})
mongoose.connection.on('disconnected', function () {
  console.log('disconnected')
})

//set the login status
const loginstatus = require('./controllers/loginInfo')
loginstatus.initLoginInfo()

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
