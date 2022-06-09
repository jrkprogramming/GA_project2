var router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res) {
    res.redirect('/user');
  });

  router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
  ));
  
  router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        // users?
      successRedirect : '/mealPrep',
      failureRedirect : '/mealPrep'
    }
  ));
  
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/mealPrep');
  });
  
  module.exports = router;