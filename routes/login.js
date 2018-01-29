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
        res.redirect('You are logged in.');
    } else {
        res.render('login.pug')
    }
});

router.post('/', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) return res.status(500).send(err);

        if (!user) return res.status(401).send(
            {
                ...user, 
                errorMessage: info,
                message: 'Redirect to Login page'
            }
        );

        req.logIn(user, (err) => {
            if (err) return res.status(500).send(err);

            return res.send({
                status: 200,
                message: 'Successful login',
                data: user
            });
        });
    })(req, res, next);
});

module.exports = router;
