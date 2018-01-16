const express = require('express');
const auth = require('./authenticate');
const users = require('./../models/users');

const router = express.Router();

router.get('/session', async (req, res, next) => {
  try {
    let userSession = req.user ? req.user : {}
    res.send(userSession)
  } catch (e) {
    next(e);
  }
});

//Require authentication for each route
// router.use(auth.isLoggedIn);

/* GET users listing. */
router.get('/', auth.isLoggedIn, async (req, res, next) => {
  try {
    const usersResponse = await users.getUsers() 
    res.send(usersResponse)
  } catch (e) {
    next(e);
  }
});

module.exports = router;
