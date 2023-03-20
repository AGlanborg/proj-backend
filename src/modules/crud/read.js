database = require('../database')
sleep = require('../sleep')

const read = {
  all: async (select, from, order = "ORDER BY main_id DESC") => {
    const sql = `SELECT ${select} FROM ${from} ${order}`;
    let content = []

    let db = database()

    await db.all(sql, [], (err, rows) => {
        content = rows
    }); // the await for db.all() does not work

    await sleep(10) // temp solution for await not working

    db.close()

    return content
  }
}

module.exports = read