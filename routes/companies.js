const express = require('express');
const router = express.Router();
const companies = require('./../models/companies');

router.get('/', async (req, res, next) => {
  try {
    const companies = await companies.getCompanies();
    res.send(companies);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
