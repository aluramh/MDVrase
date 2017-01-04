var express = require('express');
var passport = require('passport');

var router = express.Router();

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.pug', {
        message: req.flash('loginMessage')
    });
});

// process the login form
router.post('/', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }),
    function (req, res) {
        console.log("hello");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    }
);

module.exports = router;