var express = require('express');
var passport = require('passport');

var router = express.Router();
var auth = require('./authenticate');
var resourcesController = require('./../controllers/resourcesController');

//Require authentication for each route
router.use(auth.isLoggedIn);

router.get('/', function (req, res) {
    //Build the data that will be used in the template
    var templateData = {
        loggedIn: req.isAuthenticated()
        // empresas: data.empresasData,
        // marcas: data.marcasData
    };
    resourcesController.getEmpresas(req, res, templateData, function proceedToGetMarcas(req, res, templateData, rows) {
        templateData.empresas = rows;
        resourcesController.getMarcas(req, res, templateData, function renderResourcesPage(req, res, templateData, rows) {
            templateData.marcas = rows;
            // render the page and pass in any flash data if it exists
            res.render('resourcesAdd.pug', templateData);
        });
    });
});

router.post('/add', function (req, res) {
    var callback;
    switch (req.body.formType) {
        case 'addMarca':
            callback = resourcesController.addMarca;
            break;
        case 'addEmpresa':
            callback = resourcesController.addEmpresa;
            break;
        default:
            res.send("Es informacion no se pudo agregar. Intentar mas tarde.");
            return;
    }
    callback(req, res, function returnFormResponse(req, res, message) {
        //Redirect to /resources/add and send a flash message with the result
        res.send(message);
    });
});

module.exports = router;