// load up the user model
var mysql = require('mysql');
var dbconfig = require('./../config/database');
var connection = mysql.createConnection(dbconfig.connection);

//Use database
connection.query('USE ' + dbconfig.database);

//Retrieve all the companies' names
exports.getCompanies = function (req, res, next) {
    //SQL to get queries
    queryString = "SELECT * FROM empresas";
    //Execute query and throw errors OR return request
    connection.query(queryString, function (err, rows) {
        if (err) throw err;
        req.companies = rows;
        next();
    });
};