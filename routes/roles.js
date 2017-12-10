const express = require('express');
const router = express.Router();
const roles = require('./../models/roles');

router.get('/', async (req, res, next) => {
  try {
    res.send((await roles.getRoles()));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
