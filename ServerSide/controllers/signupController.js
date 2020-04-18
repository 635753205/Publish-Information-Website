const User = require('../models/user')
const loginstatus = require('./loginInfo')

exports.user_signup_get = function (req, res) {
    if (loginstatus.getLoginStatus() === true) {
        let signinfo = Object.create(null)
        signinfo.logined = true
        signinfo.unsign = true
        signinfo.signed = false
        signinfo.signsucess = false
        res.render('signup', { title: 'Sign Up', signinfo })
    } else {
        let signinfo = Object.create(null)
        signinfo.logined = false
        signinfo.unsign = true
        signinfo.signed = false
        signinfo.signsucess = false
        res.render('signup', { title: 'Sign Up', signinfo })
    }
}

exports.user_signup_success = function (req, res) {
    res.redirect('/login')
}

exports.user_signup_form = function (req, res) {
    let user = req.body.user
    console.log(user)
    User.findOne({ name: user.name, password: user.password }, (error, document) => {
        if (error) { console.log(err) }
        if (document) {
            let signinfo = Object.create(null)
            signinfo.logined = false
            signinfo.unsign = false
            signinfo.signed = true
            signinfo.signsucess = false
            res.render('signup', { title: 'Sign Up', signinfo })
        }
        if (!document) {
            let newUser = new User({
                name: user.name,
                password: user.password,
                email: user.email,
                login: false
            })
            newUser.save(function (err, status) {
                if (err) {
                    console.log(err)
                    res.redirect('/signup')
                }
                else {
                    let signinfo = Object.create(null)
                    signinfo.logined = false
                    signinfo.unsign = false
                    signinfo.signed = false
                    signinfo.signsucess = true
                    res.render('signup', { title: 'Sign Up', signinfo })
                }
            })
        }
    })

}