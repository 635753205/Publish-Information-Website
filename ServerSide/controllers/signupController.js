const User = require('../models/user')

exports.user_signup_get = function(req,res,next){
    res.render('signup',{title:'Sign Up'})
}

exports.user_signup_post = function(req,res,next){
    res.render('signup',{title:'Sign Up'})
}

exports.user_signup_form = function(req,res,next){
    let user = req.body.user
    User.findOne({name:user.name,password:password},function(err,user){
        if(err){console.log(err)}
        if(user){return res.redirect('/catalog/login')}
        if(!user){
            let user = new User(user)
            user.save(function(err,status){
                if(err){
                    console.log(err)
                    res.redirect('/catalog/signup')
                }
                console.log('regist success username'+user)
                res.redirect('/catalog/login')
            })
        }
    })

}