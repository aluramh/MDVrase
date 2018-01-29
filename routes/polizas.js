const express = require('express');
const router = express.Router();
const polizas = require('./../models/polizas');

router.get('/', async (req, res, next) => {
  try {
    res.send(await polizas.getPolizas());
  } catch (e) {
    next(e);
  }
});

module.exports = router;
