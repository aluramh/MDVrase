var express = require('express');
var auth = require('./authenticate');
var users = require('./../models/users');

var router = express.Router();

//Require authentication for each route
router.use(auth.isLoggedIn);

/* GET users listing. */
router.get('/', function (req, res, next) {
  try {
    res.send((await users.getUsers()))
  } catch (e) {
      next(e);
  }
});

module.exports = router;
