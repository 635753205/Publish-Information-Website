var createError = require('http-errors');
var express = require('express');
var path = require('path');
var User = require('./models/user')

var logger = require('morgan');
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

/**
 * Login in,Login out
 * **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var dbUrl = 'mongodb://localhost:27017/information';
app.use(cookieParser());
app.use(session({
  secret: 'information',
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter)

// 注册页面
app.get('/signup', function (req, res) {
  res.render('signup', {
    title: '注册'
  });
});

// 登录页面
app.get('/login', function (req, res) {
  res.render('login', {
    title: '登录'
  });
});

// 注册表单
app.post('/user/signup', function (req, res) {

  var _user = req.body.user;

  User.findOne({ name: _user.name }, function (err, user) {

    if (err) {

      console.log(err);

    }

    if (user) {

      return res.render('login',{title:"Login",user:user});

    } else {

      var user = new User(_user);

      user.save(function (err, user) {

        if (err) {

          console.log(err);
          res.redirect('/signup');

        }
        console.log('注册成功——用户名:' + user);
        res.render('login',{title:"Login",user:user});

      });

    }

  });

});

// 登录表单

app.post('/user/login', function (req, res) {

  var _user = req.body.user;

  var name = _user.name;

  var password = _user.password;

  User.findOne({ name: name }, function (err, user) {

    if (err) {

      console.log(err);

    }

    if (!user) {

      return res.redirect('/signup');

    }

    user.comparePassword(password, function (err, isMatch) {

      if (err) {

        console.log(err);

      }

      if (isMatch) {

        req.session.user = user; // 用户名存入session中

        console.log('登录成功——用户名: ' + user);

        return res.redirect('/');

      } else {

        return res.redirect('/lgoin');

      }

    });

  });

});

app.get('/layout', function (req, res) {

  delete req.session.user;

  //delete app.locals.user; // 删除全局变量user,否则点击退出登录,页面无变化

  res.redirect('/');

});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




app.use(function (req, res, next) {

  var _user = req.session.user;

  app.locals.user = _user;

  return next();

});

module.exports = app;
