var express = require('express');
var passport = require('passport');

var router = express.Router();
var auth = require('./authenticate');
var profileController = require('./../controllers/profileController');

// =====================================
// PROFILE SECTION =========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/', auth.isLoggedIn, function (req, res) {
    //Get user info then render page
    profileController.getUserInfo(req, res, function renderUserProfile() {
        res.render('profile.pug', {
            user: req.userInfo[0], // get the user out of session and pass to template
            loggedIn: req.isAuthenticated()
        });
    });
});

module.exports = router;