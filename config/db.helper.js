const mysql = require('mysql');
const config = require('./db.config');

// Create connection pool
const pool = mysql.createPool(config);

// Export helper function to get a connection for the pool to use to talk to the DB.
module.exports.query = (sqlQuery, escapeData, cb) => {
  pool.getConnection((err, connection) => {
    // If there is an error getting the connection, return that error.
    if (err) return cb(err);
    // Use the connection
    connection.query(sqlQuery, escapeData, (error, results, fields) => {
      // And done with the connection.
      connection.release();
  
      // Reject resolve promise after pool connection closes.
      if (error) return cb(error);
      cb(null, results);
    });
  });
}
