const db = require('./../config/db.helper');
const { esc } = db;

module.exports = {
  getPolizas: () => new Promise((resolve, reject) => {
    const query = `SELECT
        polizas.*,
        carros.*,
        marcas.nombre_marca,
        empresas.nombre_empresa
      FROM carros_polizas
      LEFT JOIN polizas 
        ON carros_polizas.num_poliza = polizas.num_poliza
      LEFT JOIN carros
        ON carros_polizas.id_carro = carros.id_carro
      LEFT JOIN marcas ON carros.marca = marcas.id_marca
      LEFT JOIN empresas ON carros.empresa = empresas.id_empresa
      WHERE 1`;

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
