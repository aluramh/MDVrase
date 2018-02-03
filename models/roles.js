const db = require('./../config/db.helper');

module.exports = {
  getRoles: (keyword) => new Promise((reject, resolve) => {
    db.query('SELECT * FROM roles WHERE 1', null, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    })
  })
}
