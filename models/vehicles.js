const db = require('./../config/db.helper');
const { esc } = db;

exports.getCars = (filters) => {
  return new Promise((resolve, reject) => {
    const { fields, id } = filters;

    const queryString = `
      SELECT ${fields || '*'} FROM carros 
      LEFT JOIN marcas ON marca = id_marca
      LEFT JOIN modelos ON modelo = id_modelo
      LEFT JOIN empresas ON empresa = id_empresa
      WHERE 1`;

    // WHERE statements
    let whereStatements = '';
    if (id) whereStatements = ` AND id_carro = ${esc(id)} `

    db.query(queryString + whereStatements, null, (err, response) => {
      if (err) return reject(err);
      resolve(response)
    })
  })
};

exports.addPoliza = function (req, res, next) {
    //Get connection from the pool
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        ///ADD CODE TO DEAL WITH DUPLICATE ENTRIES --------------------------------------------------------------------------
        //ADD CODE (END)

        //Set up query for adding Poliza to DB
        var escapeData = [req.body.poliza, req.body.vencimiento, req.body.expedicion, req.body.aseguradora];
        var queryString = `INSERT INTO polizas (num_poliza, fecha_vencimiento, fecha_expedicion, aseguradora) VALUES (?, ?, ?, ?)`;

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

exports.addCarLinkWithPoliza = function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        //Set up query for linking poliza to car inside DB
        escapeData = [req.body.poliza, req.body.id_carro, 1];
        queryString = `INSERT INTO carros_polizas (num_poliza, id_carro, poliza_actual) VALUES (?,?,?)`;

        //Execute up query for linking poliza to car inside DB
        connection.query(queryString, escapeData, function (err, rows) {
            if (err) throw err;
            connection.release();

            req.flash('success', 'true');
            req.flash('message', 'Se agrego el vehiculo y su poliza exitosamente.');
            next(req, res);
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
        var queryString = `INSERT INTO carros(empresa, num_placa, foto_vehiculo, color, modelo, marca, year,
            num_serie, fecha_obtenido, equipo_extra, descripcion, conductor)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
        //Execute query and throw errors OR return request
        connection.query(queryString, escapeData, function (err, rows) {
            if (err) throw err;
            connection.release();
            //Add ID of newly inserted vehicle in case it is required in the future.
            req.body.id_carro = rows.insertId;

            //Send flash messages for success alerts
            req.flash('success', 'true');
            req.flash('message', 'Se agrego el vehiculo exitosamente.');
            next(req, res);
        });
    });
};