var pool = require('./../config/databaseConnectionPool');

exports.getCars = function (req, res, next) {
    //Get connection to DB from connection pool
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        //SQL to get queries
        queryString = `SELECT * FROM carros 
                   LEFT JOIN marcas ON marca = id_marca
                   LEFT JOIN modelos ON modelo = id_modelo
                   LEFT JOIN empresas ON empresa = id_empresa
                   WHERE 1`;
        //Execute query and throw errors OR return request
        connection.query(queryString, function (err, rows) {
            if (err) throw err;
            connection.release();
            next(req, res, rows);
        });
    });
};