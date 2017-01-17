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

exports.addCar = function (req, res, next) {
    //Get connection to DB from connection pool
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        var escapeData = [
            // empresa,
            req.body.empresa,
            // num_placa,
            req.body.placa,
            // foto_vehiculo (if there is any)
            Boolean(req.body.foto) ? req.body.foto : null,
            // color,
            req.body.color,
            // modelo,
            req.body.modelo,
            // marca,
            req.body.marca,
            // year,
            req.body.year,
            // num_serie,
            req.body.serie,
            // fecha_obtenido,
            req.body.fechaObtenido,
            // equipo_extra,
            Boolean(req.body.equipoExtra) ? req.body.equipoExtra : null,
            // descripcion,
            Boolean(req.body.descripcion) ? req.body.descripcion : null,
            // conductor
            req.body.conductor,
        ];

        //SQL to get queries
        queryString = `INSERT INTO carros(empresa, num_placa, foto_vehiculo, color, modelo, marca, year,
            num_serie, fecha_obtenido, equipo_extra, descripcion, conductor)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
        //Execute query and throw errors OR return request
        connection.query(queryString, escapeData, function (err, rows) {
            if (err) throw err;
            connection.release();
            req.flash('success', 'true');
            req.flash('message', 'Se agrego el vehiculo exitosamente.');
            next(req, res);
        });
    });
};