var express = require('express');
var passport = require('passport');

var router = express.Router();

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
router.get('/', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.pug', {
        message: req.flash('signupMessage')
    });
});

// process the signup form
router.post('/', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

module.exports = router;