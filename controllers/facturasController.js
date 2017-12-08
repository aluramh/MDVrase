const db = require('./../config/db.helper');

exports.getFacturas = (req, res, resultsObject, next) => {
  new Promise((resolve, reject) => {
    //SQL to get queries
    var queryString = `SELECT * FROM facturas`;
    //Execute query and throw errors OR return request
    db.query(queryString, null, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  })
};

exports.getEmisores = function (next) {
    //Get connection from the pool
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        //Set up query for adding Poliza to DB
        var queryString = `select DISTINCT emisor FROM facturas`;

        //Execute query for adding poliza to DB
        connection.query(queryString, function (err, rows) {
            if (err) throw err;
            connection.release();

            next(rows);
        });
    });
}

exports.addFactura = function (req, res, next) {
    //Get connection from the pool
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        //Set up query for adding Poliza to DB
        var queryString = `
            INSERT INTO facturas (
                id_factura,
                empresa, 
                emisor, 
                costo, 
                descripcion,
                pagado,
                usuario_que_capturo,
                fecha_factura,
                fecha_capturado
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

        var escapeData = [
            req.body.id_factura,
            req.body.empresa,
            req.body.emisor,
            req.body.costo,
            req.body.descripcion,
            false,
            req.user.id_usuario,
            req.body.fechaFactura,
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