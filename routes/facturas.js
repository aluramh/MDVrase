var express = require('express');
var moment = require('moment')
var router = express.Router();

var facturasController = require('./../models/facturasController');

router.get('/', async (req, res, next) => {
  try {
    const facturas = await facturasController.getFacturas();
    res.send(facturas);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newItem = {
      factura: req.body.id_factura,
      empresa: req.body.empresa,
      emisor: req.body.emisor,
      costo: req.body.costo,
      descripcion: req.body.descripcion,
      pagado: false,
      userId: req.user.id_usuario,
      date: req.body.fechaFactura,
    };
    const response = await facturasController.addFactura(newItem);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
