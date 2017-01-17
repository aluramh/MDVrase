var pool = require('./../config/databaseConnectionPool');

// load up the user model
var mysql = require('mysql');
var dbconfig = require('./../config/database');
var connection = mysql.createConnection(dbconfig.connection);

//Use database
connection.query('USE ' + dbconfig.database);

exports.addMarca = function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM marcas WHERE nombre_marca = ?", [req.body.marca], function (err, rows) {
            //If there's an error, throw it
            if (err) throw err;
            //If there is an element in Array, the item already exists
            if (rows.length > 0) {
                connection.release();
                //Execute callback function with error message
                req.flash('message', "Esta marca ya existe en la base de datos.");
                req.flash('success', "false");
                next(req, res);
            } else {
                //If array is empty, the item can be added
                connection.query("INSERT INTO marcas (nombre_marca) VALUES (?)", [req.body.marca], function (err) {
                    //If there's an error, throw it
                    if (err) throw err;
                    //Release connection to connection pool
                    connection.release();
                    //Execute callback function with success message
                    req.flash('message', "La marca fue agregada exitosamente!");
                    req.flash('success', "true");
                    next(req, res);
                });
            }
        });
    });
};

exports.addEmpresa = function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM empresas WHERE nombre_empresa = ?", [req.body.empresa], function (err, rows) {
            if (err) throw err;
            if (rows.length > 0) {
                next(req, res, "Esta empresa ya existe en la base de datos.");
            } else {
                connection.query("INSERT INTO empresas (nombre_empresa, rfc) VALUES (?, ?)", [req.body.empresa, req.body.rfc], function (err) {
                    if (err) throw err;
                    connection.release();
                    req.flash('message', "La empresa fue agregada exitosamente!");
                    req.flash('success', "true");
                    next(req, res);
                });
            }
        });
    });
};

exports.getMarcas = function (req, res, resultsObject, next) {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM marcas WHERE 1", function (err, rows) {
            if (err) throw err;
            connection.release();
            next(req, res, resultsObject, rows);
        });
    });
};

exports.getEmpresas = function (req, res, resultsObject, next) {
    //Get connection to DB from connection pool
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("SELECT * FROM empresas WHERE 1", function (err, rows) {
            if (err) throw err;
            connection.release();
            next(req, res, resultsObject, rows);
        });
    });
};

exports.getPolizas = function (req, res, resultsObject, next) {
    //Get connection to DB from connection pool
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        var queryString = `
            SELECT 
                *,
                DATE_FORMAT(fecha_expedicion, '%Y-%m-%dT%TZ') AS fecha_expedicion,
                DATE_FORMAT(fecha_vencimiento, '%Y-%m-%dT%TZ') AS fecha_vencimiento
            FROM carros_polizas
            LEFT JOIN carros
                ON carros_polizas.id_carro = carros.id_carro
            LEFT JOIN polizas
                ON carros_polizas.num_poliza = polizas.num_poliza
            WHERE 1`;

        connection.query(queryString, function (err, rows) {
            if (err) throw err;
            connection.release();

            next(req, res, resultsObject, rows);
        });
    });
};