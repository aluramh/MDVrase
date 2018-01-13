const express = require('express');
const auth = require('./authenticate');
const users = require('./../models/users');

const router = express.Router();

//Require authentication for each route
router.use(auth.isLoggedIn);

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const usersResponse = await users.getUsers() 
    res.send(usersResponse)
  } catch (e) {
    next(e);
  }
});

router.get('/self', async (req, res, next) => {
  try {
    res.send(req.user)
  } catch (e) {
    next(e);
  }
});

module.exports = router;
