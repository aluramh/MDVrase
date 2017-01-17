var express = require('express');
var passport = require('passport');

var router = express.Router();
var auth = require('./authenticate');
var moment = require('moment');
//Set moment locale to spanish
moment.locale('es-mx');
var resourcesController = require('./../controllers/resourcesController');

//Require authentication for each route
router.use(auth.isLoggedIn);

router.get('/', function (req, res) {
    //Build the data that will be used in the template
    var templateData = {
        title: 'Recursos',
        loggedIn: req.isAuthenticated(),
        message: req.flash('message'),
        success: req.flash('success'),
    };
    resourcesController.getEmpresas(req, res, templateData, function proceedToGetMarcas(req, res, templateData, rows) {
        templateData.empresas = rows;
        resourcesController.getMarcas(req, res, templateData, function proceedToGetPolizas(req, res, templateData, rows) {
            templateData.marcas = rows;
            resourcesController.getPolizas(req, res, templateData, function renderResourcesPage(req, res, templateData, rows) {
                templateData.polizas = rows;

                //Format dates to correct format
                for (var i = 0; i < templateData.polizas.length; i++) {
                    templateData.polizas[i].fecha_expedicion = moment(templateData.polizas[i].fecha_expedicion).format('DD/MMMM/YYYY');
                    templateData.polizas[i].fecha_vencimiento = moment(templateData.polizas[i].fecha_vencimiento).format('DD/MMMM/YYYY');
                }

                // render the page and pass in any flash data if it exists
                res.render('resourcesAdd.pug', templateData);
            });
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

    callback(req, res, function returnFormResponse(req, res) {
        //Redirect to the original page (flash message has already been set)
        res.redirect('/resources');
    });
});

module.exports = router;