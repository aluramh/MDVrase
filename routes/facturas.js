var express = require('express');
var moment = require('moment')
var router = express.Router();

var resourcesController = require('./../controllers/resourcesController');
var vehiclesController = require('./../controllers/vehiclesController');
var facturasController = require('./../controllers/facturasController');

router.get('/', function (req, res) {
    //Build the data that will be used in the template
    var templateData = {
        title: 'Facturas',
        loggedIn: req.isAuthenticated(),
        message: req.flash('message'),
        success: req.flash('success'),
    };
    resourcesController.getEmpresas(req, res, templateData, function proceedToGetCars(req, res, templateData, rows) {
        templateData.empresas = rows;
        vehiclesController.getCars(req, res, templateData, function proceedToGetPolizas(req, res, templateData, rows) {
            templateData.cars = rows;
            facturasController.getFacturas(req, res, templateData, function proceedToGetPolizas(req, res, templateData, rows) {
                var formattedDates = []
                for (var i = 0; i < rows.length; i++) {
                    rows[i].fecha_factura = moment(rows[i].fecha_factura).format('DD/MMMM/YYYY');
                    rows[i].fecha_capturado = moment(rows[i].fecha_capturado).format('DD/MMMM/YYYY');
                    // Add active polizas to a new object element
                    formattedDates.push(rows[i]);
                }
                res.render('facturas.pug', {
                    title: 'Manejo de vehiculos RASE',
                    loggedIn: req.isAuthenticated(),
                    carros: templateData.cars,
                    empresas: templateData.empresas,
                    facturas: rows
                }); // load the index.ejs file
            });
        });
    });
});

router.post('/add', function (req, res) {
    facturasController.addFactura(req, res, function proceedToRenderPage(req, res) {
        res.redirect('/facturas');
    });
});
module.exports = router;