var express = require('express');
var passport = require('passport');
var auth = require('./authenticate');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var users = require('./../models/users');

// =====================================
// SIGNUP ==============================
// =====================================
// process the signup form
router.post('/', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

// process the signup form. Route for adming only.
router.post('/admin', auth.isLoggedIn, (req, res) => {
  try {
    const username = req.body.username;
    const similarUsers = users.getUsers({ username: username });

    if (similarUsers.length > 0) {
      res.status(500).send({status: 500, message: 'Username already exists.'})
    } else {
      const newUser = [
        username,
        //1 for "Administrador", 2 for "Capturista"
        Boolean(req.body.rol) ? req.body.rol : 2,
        req.body.empresa,
        req.body.nombre,
        //Use the generateHash function in our user model
        bcrypt.hashSync(req.body.password, null, null),
        //1 for "active" and 0 for "inactive"
        Boolean(req.body.activo) ? req.body.activo : 0
      ];
      const response = users.addUser(newUser);
      res.send({status: 500, message: 'Succesful registration', data: response});
    } 
  } catch(e) {
    next(e)
  }
});

module.exports = router;
