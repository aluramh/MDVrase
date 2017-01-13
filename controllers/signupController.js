// load up the DB connection pool
var pool = require('./../config/databaseConnectionPool');

//Retrieve all the companies' names
exports.getCompanies = function (req, res, next) {
    //Get connection to DB from connection pool
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        //SQL to get queries
        queryString = "SELECT * FROM empresas";
        //Execute query and throw errors OR return request
        connection.query(queryString, function (err, rows) {
            if (err) throw err;
            connection.release();

            //This has to change vvv
            req.companies = rows;
            next();
        });
    });
};