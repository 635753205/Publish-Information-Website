module.exports = {
    initLoginInfo:function(){
        this.login = false
    },

    loginSucess:function(){
        this.login = true
    },

    getLoginStatus:function(){
        return this.login
    }
}