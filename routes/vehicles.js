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
            message: req.flash('loginMessage'),
            loggedIn: req.isAuthenticated()
        });
    });
});

module.exports = router;