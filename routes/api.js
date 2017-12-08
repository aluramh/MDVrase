var express = require('express');
var router = express.Router();

var resourcesController = require('./../controllers/resourcesController');
var vehiclesController = require('./../controllers/vehiclesController');
var facturasController = require('./../controllers/facturasController');

router.post('/getmarcas', function (req, res) {
    facturasController.addFactura(req, res, (req, res) => {
        res.redirect('/facturas');
    });
});

router.post('/getmodelos', function (req, res) {
    facturasController.addFactura(req, res, (req, res) => {
        res.redirect('/facturas');
    });
});

router.post('/getemisores', function (req, res) {
    facturasController.getEmisores((rows) => {
        res.send(rows);
    });
});

module.exports = router;