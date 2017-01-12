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
    // render the page and pass in any flash data if it exists
    res.render('vehiclesAdd.pug', {
        loggedIn: req.isAuthenticated()
    });
});

module.exports = router;

var obj = {
    color: "Blanco",
    conductor: "Alejandro Ramirez",
    descripcion: null,
    equipo_extra: null,
    fecha_obtenido: '2017 - 01 - 01 T06: 00: 00.000 Z',
    foto_vehiculo: null,
    empresa: 1,
    // id_carro: 1,
    // id_marca: 1,
    // id_modelo: 2,
    // marca: 1,
    // modelo: 2,
    nombre_marca: "Mazda",
    nombre_modelo: "Mazda 3",
    num_placa: "SVT4566",
    num_serie: "ABCDE123456"
}