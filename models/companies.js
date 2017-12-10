const db = require('./../config/db.helper');

module.exports = {
  getCompanies: (keyword) => {
    return new Promise((reject, resolve) => {
      db.query('SELECT * FROM empresas WHERE 1', null, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      })
    })
  }
}
