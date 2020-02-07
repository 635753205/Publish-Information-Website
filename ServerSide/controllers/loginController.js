
const User = require('../models/user')

exports.user_login_get = function(req,res,next){
    res.render('login',{title:'Login'})
}

exports.user_login_post = function(req,res,next){
    let user = req.body.user
    let name = user.name
    let password = user.password
    User.findOne({name:name,password:password},function(err,result){
        if(err){
            console.log(err)
        }
        if(!result){
            return res.redirect('/catalog/signup')
        }
        user.comparePassword()
    })
}

