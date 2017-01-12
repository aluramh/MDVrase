// load up the user model
var mysql = require('mysql');
var dbconfig = require('./../config/database');
var connection = mysql.createConnection(dbconfig.connection);

//Use database
connection.query('USE ' + dbconfig.database);

// connection.query("SELECT * FROM usuarios WHERE username = ?", [username], function (err, rows) {
exports.addMarca = function (req, res, next) {
    connection.query("SELECT * FROM marcas WHERE nombre_marca = ?", [req.body.marca], function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            next(req, res, "Esta marca ya existe en la base de datos.");
        } else {
            connection.query("INSERT INTO marcas (nombre_marca) VALUES (?)", [req.body.marca], function (err) {
                if (err) throw err;
                next(req, res, "La marca fue agregada exitosamente!");
            });
        }
    });
};