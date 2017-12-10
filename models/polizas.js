const db = require('./../config/db.helper');

module.exports = {
  getPolizas: (keyword) => {
    return new Promise((reject, resolve) => {
      db.query('SELECT * FROM polizas WHERE 1', null, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      })
    })
  }
}
