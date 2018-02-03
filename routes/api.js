const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/vehicles', require('./vehicles'));
router.use('/polizas', require('./polizas'));

// router.post('/getmarcas', function (req, res) {
//     facturasController.addFactura(req, res, (req, res) => {
//         res.redirect('/facturas');
//     });
// });

// router.post('/getmodelos', function (req, res) {
//     facturasController.addFactura(req, res, (req, res) => {
//         res.redirect('/facturas');
//     });
// });

// router.post('/getemisores', function (req, res) {
//     facturasController.getEmisores((rows) => {
//         res.send(rows);
//     });
// });

module.exports = router;