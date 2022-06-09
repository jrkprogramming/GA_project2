const User = require('../models/user')

function showLogin(req, res) {
    res.render('login')
}

module.exports = {
    showLogin
}