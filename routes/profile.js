var express = require('express');
var passport = require('passport');

var router = express.Router();
var auth = require('./authenticate');

// =====================================
// PROFILE SECTION =========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/', auth.isLoggedIn, function (req, res) {
    res.render('profile.pug', {
        user: req.user, // get the user out of session and pass to template
        loggedIn: req.isAuthenticated()
    });
});

module.exports = router;