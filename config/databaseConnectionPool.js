// load up the user model
var mysql = require('mysql');
var dbconfig = require('./database');

// Initialize pool
var pool = mysql.createPool(dbconfig.connection);

module.exports = pool;