var express = require('express');
var passport = require('passport');

var router = express.Router();

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/', function (req, res) {
    if (req.isAuthenticated() === true) {
        res.redirect('/profile');
    } else {
        // render the page and pass in any flash data if it exists
        res.render('login.pug', {
            title: 'Ingresar a la pagina',
            message: req.flash('loginMessage'),
            loggedIn: req.isAuthenticated()
        });
    }
});

router.post('/', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            //Check if remember me was activated in previous Login step
            if (req.body.remember == 1) {
                res.cookie('usernameCookie', req.body.username);
            }
            return res.redirect('/profile');
        });
    })(req, res, next);
});

module.exports = router;