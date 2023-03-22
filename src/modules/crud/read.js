database = require('../database')

const read = {
  one: async (from) => {
    const sql = `SELECT * FROM ${from} ORDER BY ${from}_id DESC`;

    let db = database()

    const rows = await new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) {
          return reject(err)
        }
        return resolve(rows)
      })
    })

    db.close()

    return rows
  },
  all: async () => {
    const first = `SELECT * FROM main JOIN saljare ON main.saljare = saljare.saljare_id`
    const second = `SELECT * FROM (${first}) AS f JOIN kopare ON f.kopare = kopare.kopare_id`
    const third = `SELECT * FROM (${second}) AS s JOIN arbetstyp ON s.arbetstyp = arbetstyp.arbetstyp_id`

    const sql = `SELECT * FROM ${third} "ORDER BY main_id DESC"`;

    let db = database()

    const rows = await new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) {
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