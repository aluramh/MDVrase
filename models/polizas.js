const db = require('./../config/db.helper');
const { esc } = db;

module.exports = {
  getPolizas: () => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM polizas WHERE 1';

    db.query(query, null, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    })
  }),
  
  updatePoliza: (id, data) => new Promise((resolve, reject) => {
    const updateStatements = Object.keys(data).map(key => ` ${key} = ${esc(data[key])} `)
    const query = `
      UPDATE polizas
      SET ${updateStatements.join(', ')}
      WHERE id = ${esc(id)}`

    db.query(query, null, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    })
  })
}
