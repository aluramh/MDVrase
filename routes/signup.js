var express = require('express');
var passport = require('passport');

var auth = require('./authenticate');
var router = express.Router();
var signupController = require('./../controllers/signupController');

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
router.get('/', function (req, res) {
    //Get companies
    signupController.getCompanies(req, res, function renderSignupPage() {
        // render the page and pass in any flash data if it exists
        res.render('signup.pug', {
            title: 'Registro',
            message: req.flash('signupMessage'),
            loggedIn: req.isAuthenticated(),
            companies: req.companies
        });
    });
});

// process the signup form
router.post('/', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// process the signup form
router.post('/admin', auth.isLoggedIn, function (req, res) {
    signupController.registerUser(req, res, function redirectToUsersPage(req, res) {
        res.redirect('/users');
    });
});

module.exports = router;