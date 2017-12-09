// load up the DB connection pool
var pool = require('./../config/databaseConnectionPool');
var bcrypt = require('bcrypt-nodejs');

//Retrieve all the companies' names
exports.getCompanies = function (req, res, next) {
    //Get connection to DB from connection pool
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        //SQL to get queries
        var queryString = "SELECT * FROM empresas";
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

//Retrieve all the companies' names
exports.registerUser = function (req, res, next) {
    //Get connection to DB from connection pool
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        //SQL to get queries

        connection.query("SELECT * FROM usuarios WHERE username = ?", [req.body.username], function (err, rows) {
            if (err) throw err;
            //Check if there is already a user registered with that names
            if (rows.length) {
                req.flash('success', "false");
                req.flash('message', 'Este usuario ya existe en la base de datos.');
                next(req, res);
            }
            //Else, insert it into the DB
            else {
                //Query to execute user registration
                var insertQuery = `INSERT INTO usuarios ( username, rol, empresa, nombre, password, activo ) values (?,?,?,?,?,?)`;
                var newUser = [
                    req.body.username,
                    //1 for "Administrador", 2 for "Capturista"
                    Boolean(req.body.rol) ? req.body.rol : 2,
                    req.body.empresa,
                    req.body.nombre,
                    //Use the generateHash function in our user model
                    bcrypt.hashSync(req.body.password, null, null),
                    //1 for "active" and 0 for "inactive"
                    Boolean(req.body.activo) ? req.body.activo : 0
                ];
                connection.query(insertQuery, newUser, function (err, rows) {
                    if (err) throw err;
                    connection.release();

                    req.body.id_usuario = rows.insertId;

                    req.flash('success', "true");
                    req.flash('message', 'El usuario fue agregado exitosamente.');
                    return next(req, res);
                });
            }
        });
    });
};