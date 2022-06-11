const User = require('../models/user')

function showLogin(req, res) {
    res.render('login')
}

function userProfile(req, res) {
    User.findById(req.params.id).then((user) => {
        res.render('userProfile', {user})
    })
}


module.exports = {
    showLogin,
    userProfile
}