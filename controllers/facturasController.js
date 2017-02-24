var pool = require('./../config/databaseConnectionPool');

exports.getFacturas = function (req, res, resultsObject, next) {
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        //SQL to get queries
        var queryString = `SELECT * FROM facturas`;
        //Execute query and throw errors OR return request
        connection.query(queryString, function (err, rows) {
            if (err) throw err;
            connection.release();
            next(req, res, resultsObject, rows);
        });
    });
};

exports.addFactura = function (req, res, next) {
    //Get connection from the pool
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        //Set up query for adding Poliza to DB
        var queryString = `
            INSERT INTO facturas (
                empresa, 
                emisor, 
                costo, 
                descripcion,
                pagado,
                usuario_que_capturo,
                fecha_factura,
                fecha_capturado
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        var escapeData = [
            req.body.poliza, 
            req.body.vencimiento, 
            req.body.expedicion, 
            req.body.aseguradora
        ];

        //Execute query for adding poliza to DB
        connection.query(queryString, escapeData, function (err, rows) {
            if (err) throw err;
            connection.release();

            req.flash('success', 'true');
            req.flash('message', 'Se agrego la poliza exitosamente.');
            next(req, res);
        });
    });
};