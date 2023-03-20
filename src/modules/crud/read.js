database = require('../database')

const read = {
  all: async (select, from, order = "ORDER BY main_id DESC") => {
    const sql = `SELECT ${select} FROM ${from} ${order}`;

    let db = database()

    const rows = await new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
          if(err) {
              return reject(err)
          }
          return resolve(rows)
      })
  })

    db.close()

    return rows
  }
}

module.exports = read