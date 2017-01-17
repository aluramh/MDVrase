var express = require('express');
var passport = require('passport');

var router = express.Router();
var auth = require('./authenticate');
var vehiclesController = require('./../controllers/vehiclesController');
var currentPageHelper = require('./../helpers/templateFunctions');

//Require authentication for each route
router.use(auth.isLoggedIn);

router.get('/', function (req, res) {
    //Get list of all available cars
    vehiclesController.getCars(req, res, function renderVehiclesPage(req, res, vehiclesData) {
        // render the page and pass in any flash data if it exists
        res.render('vehicles.pug', {
            title: 'Vehiculos',
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
        title: 'Agregar vehiculos',
        loggedIn: req.isAuthenticated(),
        //Pass flash messages, if there are any
        message: req.flash('message'),
        success: req.flash('success')
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
    vehiclesController.addCar(req, res, function redirectWithSuccessMessage(req, res) {
        res.redirect('/vehicles/add');
    });
});

module.exports = router;

/* Datos basicos para un nuevo vehiculo

$("#modelo").val("S model");
$("#marca").val(6);
$("#color").val("Rojo");
$("#year").val("2016");
$("#empresa").val(1);
$("#placa").val("SVT1234");
$("#serie").val("SMDL049387345");
$("#fechaObtenido").val("13/Enero/2017");
$("#conductor").val("Alejandro Ramirez");

$("#poliza").val("VEVDSFV345JOKH");
$("#aseguradora").val("Banorte Seguros");
$("#expedicion").val("15/Enero/2017");
$("#vencimiento").val("15/Enero/2027");
 
*/