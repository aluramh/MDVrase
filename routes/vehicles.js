var express = require('express');
var passport = require('passport');

var router = express.Router();
var auth = require('./authenticate');
var vehiclesController = require('./../controllers/vehiclesController');

//Require authentication for each route
router.use(auth.isLoggedIn);

router.get('/', function (req, res) {
    //Get list of all available cars
    vehiclesController.getCars(req, res, function renderVehiclesPage(req, res, vehiclesData) {
        // render the page and pass in any flash data if it exists
        res.render('vehicles.pug', {
            vehicles: vehiclesData,
            loggedIn: req.isAuthenticated()
        });
    });
});

router.get('/add', function (req, res) {
    //For access to get Marcas and Empresas values
    var resourcesController = require('./../controllers/resourcesController');
    //Declare variable for template date
    var templateData = {
        loggedIn: req.isAuthenticated()
    };
    //Retrieve empresas
    resourcesController.getEmpresas(req, res, templateData, function proceedToGetMarcas(req, res, templateData, rows) {
        templateData.empresas = rows;
        //Retrieve Marcas
        resourcesController.getMarcas(req, res, templateData, function renderResourcesPage(req, res, templateData, rows) {
            templateData.marcas = rows;
            // render the page and pass in any flash data if it exists
            res.render('vehiclesAdd.pug', templateData);
        });
    });
});

router.post('/add', function (req, res) {
    vehiclesController.addCar(req, res, function renderAddCarSuccessPage(req, res, message) {
        res.send(message);
    });
});

module.exports = router;