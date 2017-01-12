var express = require('express');
var passport = require('passport');

var router = express.Router();
var auth = require('./authenticate');
var resourcesController = require('./../controllers/resourcesController');

//Require authentication for each route
router.use(auth.isLoggedIn);

router.get('/add', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('resourcesAdd.pug', {
        loggedIn: req.isAuthenticated()
    });
});

router.post('/add', function (req, res) {
    var callback;
    switch (req.body.formType) {
        case 'addMarca':
            callback = resourcesController.addMarca;
    }
    callback(req, res, function returnFormResponse(req, res, message) {
        //Redirect to /resources/add and send a flash message with the result
        res.send(message);
    });
});

module.exports = router;