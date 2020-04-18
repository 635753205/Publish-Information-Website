var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
const login_controller = require('../controllers/loginController')

const signup_controller = require('../controllers/signupController')

router.get('/',function(req,res){
  res.redirect('/catalog')
})

router.get('/signup',signup_controller.user_signup_get)

router.post('/signup',signup_controller.user_signup_form)

router.post('/signup/success',signup_controller.user_signup_success)

router.get('/login',login_controller.user_login_get)

router.post('/login',login_controller.user_login_post)



module.exports = router;
