var express = require('express');
var passport = require('passport');

var router = express.Router();
var auth = require('./authenticate');
const vehicles = require('./../models/vehicles');

//Require authentication for each route
// router.use(auth.isLoggedIn);

router.get('/', async (req, res, next) => {
  try {
    //Get list of all available cars
    const vehiclesRows = await vehicles.getCars(req.query);
    res.send(vehiclesRows)
  } catch(e) {
    next(e)
  }
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

// delete FROM `carros_polizas` where 1; delete from polizas where 1;

router.post('/add', function (req, res) {
    vehiclesController.addCar(req, res, function proceedToAddPoliza(req, res) {
        //Empty flash messages by calling them
        hf.flushFlashConnect(req, res);
        vehiclesController.addPoliza(req, res, function proceedToLinkCarWithPoliza(req, res) {
            //Empty flash messages by calling them
            hf.flushFlashConnect(req, res);
            vehiclesController.addCarLinkWithPoliza(req, res, function renderPageWithSuccessMessage(req, res) {
                res.redirect('/vehicles/add');
            });
        });
    });
});

router.get('/:vehicleId', function (req, res) {
    //Get list of all available cars
    vehiclesController.getCarFromId(req, res, null, function renderVehiclesPage(req, res, empty, vehicleInfo) {
        // //Replace line breaks with <br>
        // vehicleInfo[0].descripcion = hf.nl2br(vehicleInfo[0].descripcion);
        // vehicleInfo[0].equipo_extra = hf.nl2br(vehicleInfo[0].equipo_extra);

        // render the page and pass in any flash data if it exists
        res.render('vehiclesId.pug', {
            title: 'Vehiculos',
            vehicle: vehicleInfo[0],
            loggedIn: req.isAuthenticated()
        });
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