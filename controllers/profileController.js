// load up the DB connection pool
var pool = require('./../config/databaseConnectionPool');

exports.getUserInfo = function (req, res, next) {
    //Get connection from pool
    pool.getConnection(function (err, connection) {
        //Check if there's an error when connecting
        if (err) throw err;
        //Else, declare query to execute
        var queryString = `SELECT * FROM usuarios 
                   LEFT JOIN empresas ON empresa = id_empresa
                   LEFT JOIN roles ON rol = id_rol
                   WHERE id_usuario = ?`;
        //Execute query, with escaped values, and throw errors OR return request.
        connection.query(queryString, [req.user.id_usuario], function (err, rows) {
            if (err) throw err;
            //Query was executed correctly, so release the connection
            connection.release();
            //And finally pass information over to callback
            next(req, res, rows);
        });
    });
};

exports.getAllUsersInfo = function (req, res, resultsObject, next) {
    //Get connection from pool
    pool.getConnection(function (err, connection) {
        //Check if there's an error when connecting
        if (err) throw err;
        //Else, declare query to execute
        var queryString = `SELECT * FROM usuarios 
                   LEFT JOIN empresas ON empresa = id_empresa
                   LEFT JOIN roles ON rol = id_rol
                   WHERE 1
                   ORDER BY id_empresa`;
        //Execute query, with escaped values, and throw errors OR return request.
        connection.query(queryString, function (err, rows) {
            if (err) throw err;
            //Query was executed correctly, so release the connection
            connection.release();
            //And finally pass information over to callback
            next(req, res, resultsObject, rows);
        });
    });
};