var express = require('express');
var passport = require('passport');

var router = express.Router();

// =====================================
// PROFILE SECTION =========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/', isLoggedIn, function (req, res) {
    res.render('profile.pug', {
        user: req.user // get the user out of session and pass to template
    });
});

// route middleware to make sure
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;