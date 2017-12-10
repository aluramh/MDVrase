var express = require('express');
var passport = require('passport');

var router = express.Router();

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/', function (req, res) {
    if (req.isAuthenticated() === true) {
        // If the user is already logged in, redirect him to profile.
        res.redirect({status: 301, message: 'Redirect to profile'});
    } else {
        res.send({message: 'Already logged in.'});
    }
});

router.post('/', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            res.redirect({status: 301, message: 'Redirect to Login page'});
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            //Check if remember me was activated in previous Login step
            if (req.body.remember == 1) {
                res.cookie('usernameCookie', req.body.username);
            }
            return res.send({
                status: 200,
                message: 'Successful login',
                data: user
            });
        });
    })(req, res, next);
});

module.exports = router;
