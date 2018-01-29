const db = require('./../config/db.helper');

module.exports = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      let query = `
        SELECT * FROM usuarios WHERE 1
      `;
      let whereStatements = '';

      // // Search by username
      // if (userObject.username) {
      //   whereStatements += `AND username = ${db.esc} `
      // }

      db.query(query + whereStatements, null, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      })
    })
  },

  addUser: (newUser) => {
    return new Promise((reject, resolve) => {
      const sql = `
        INSERT INTO usuarios (
          username, rol, empresa, nombre, password, activo
        ) values (?, ?, ?, ?, ?, ?)`;

      db.query(sql, newUser, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      })
    })
  }
}
