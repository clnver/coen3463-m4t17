var passport = require('passport');
var User = require('../models/user');
var express = require('express');
var router = express.Router();
var passport = require('passport');



router.route('/register')
  .get(function(req, res, next) {
    res.render('login', {});
  })
  .post(function(req, res, next) {
    User.register(new User({username: req.body.username}), req.body.password,  req.body.fname,  req.body.lname, function(err, account) {
      if(err) {
        return res.render('login');
      }

      req.login(account, function(err) {
        res.redirect('/addCompanies');
      });
    });
  });

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/addCompanies');
  });

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;