const db = require('./../config/db.helper');

module.exports = {
  getFacturas: () => {
    return new Promise((resolve, reject) => {
      //SQL to get queries
      var queryString = `SELECT * FROM facturas`;
      //Execute query and throw errors OR return request
      db.query(queryString, null, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    })
  },

  addFactura: (factura) => {
    return new Promise((reject, resolve) => {
      //Set up query for adding Poliza to DB
      const queryString = `
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;

      var escapeData = [
        factura.factura,
        factura.empresa,
        factura.emisor,
        factura.costo,
        factura.descripcion,
        factura.pagado,
        factura.userId,
        factura.date
      ];

      //Execute query for adding poliza to DB
      db.query(queryString, escapeData, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    })
  },

  getEmisores: () => {
    return new Promise((resolve, reject) => {
      //SQL to get queries
      var queryString = `SELECT DISTINCT emisor FROM facturas`;
      //Execute query and throw errors OR return request
      db.query(queryString, null, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    })
  }
}
