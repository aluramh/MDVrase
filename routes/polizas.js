'use strict'

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

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = req.query;
    
    if (data) {
      await polizas.updatePoliza(id, data)
    }

    res.send();
  } catch (e) {
    next(e);
  }
})

module.exports = router;
