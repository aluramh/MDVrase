var express = require('express');
var router = express.Router();

var auth = require('./authenticate');
var resourcesController = require('./../controllers/resourcesController');
var profileController = require('./../controllers/profileController');

//Require authentication for each route
router.use(auth.isLoggedIn);

/* GET users listing. */
router.get('/', function (req, res, next) {
    var templateData = {
        title: 'Usuarios',
        loggedIn: req.isAuthenticated(),
        message: req.flash('message'),
        success: req.flash('success')
    };
    resourcesController.getEmpresas(req, res, templateData, function getUsersList(req, res, templateData, rows) {
        templateData.companies = rows;
        profileController.getAllUsersInfo(req, res, templateData, function renderUsersPage(req, res, templateData, rows) {
            templateData.usuarios = rows;
            res.render('users.pug', templateData);
        });
    });
});

module.exports = router;