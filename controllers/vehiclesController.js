// load up the user model
var mysql = require('mysql');
var dbconfig = require('./../config/database');
var connection = mysql.createConnection(dbconfig.connection);

//Use database
connection.query('USE ' + dbconfig.database);

exports.getCars = function (req, res, next) {
    //SQL to get queries
    queryString = `SELECT * FROM carros 
                   LEFT JOIN marcas ON marca = id_marca
                   LEFT JOIN modelos ON modelo = id_modelo
                   WHERE 1`;
    //Execute query and throw errors OR return request
    connection.query(queryString, function (err, rows) {
        if (err) throw err;
        next(req, res, rows);
    });
};