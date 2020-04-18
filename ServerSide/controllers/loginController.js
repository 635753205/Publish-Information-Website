
const User = require('../models/user')
const loginstatus = require('./loginInfo')

exports.user_login_get = function (req, res) {

    if (loginstatus.getLoginStatus() === true) {
        let logininfo = Object.create(null)
        logininfo.unlogin = false
        logininfo.logined = true
        logininfo.tip = false
        res.render('login', { title: 'Login', logininfo })
    } else {
        let logininfo = Object.create(null)
        logininfo.unlogin = true
        logininfo.logined = false
        logininfo.tip = false
        res.render('login', { title: 'Login', logininfo })
    }

}

exports.user_login_post = function (req, res) {
    let user = req.body.user
    let name = user.name
    let password = user.password
    User.findOne({ name: name, password: password }, function (err, result) {
        if (err) {
            console.log(err)
        }
        console.log(result)
        if (result === null) {
            let logininfo = Object.create(null)
            logininfo.unlogin = true
            logininfo.logined = false
            logininfo.tip = true
            res.render('login', { title: 'Login', logininfo })
        }
        if (result) {
            loginstatus.loginSucess()
            let logininfo = Object.create(null)
            logininfo.unlogin = false
            logininfo.logined = true
            logininfo.tip = true
            res.render('login',{ title: 'Login', logininfo })
        }
    })
}

