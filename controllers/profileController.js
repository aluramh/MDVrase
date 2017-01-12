// load up the user model
var mysql = require('mysql');
var dbconfig = require('./../config/database');
var connection = mysql.createConnection(dbconfig.connection);

//Use database
connection.query('USE ' + dbconfig.database);

//Retrieve all the User info
exports.getUserInfo = function (req, res, next) {
    //SQL to get queries
    queryString = `SELECT * FROM usuarios 
                   LEFT JOIN empresas ON empresa = id_empresa
                   LEFT JOIN roles ON rol = id_rol
                   WHERE id_usuario = ?`;
    //Execute query, with escaped values, and throw errors OR return request.
    connection.query(queryString, [req.user.id_usuario], function (err, rows) {
        if (err) throw err;
        //Pass information over to callback
        next(req, res, rows);
    });
};