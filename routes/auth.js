const router = require('express').Router();
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
      successRedirect : '/mealPrep',
      failureRedirect : '/mealPrep'
    }
  ));
  
  router.get('/logout', function(req, res){
    req.logout(()=> {
      res.redirect('/user/login');
    });
  });
  
  module.exports = router