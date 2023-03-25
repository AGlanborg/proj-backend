const database = require('../database')

async function remove(data) {
    let sql = `DELETE FROM ${data.tabel} WHERE ${data.tabel}_id = ${parseInt(data.id)}`;

    db = database()

    await db.run(sql);

    db.close()
}

module.exports = remove