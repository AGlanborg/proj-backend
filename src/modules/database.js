const sqlite3 = require('sqlite3').verbose();

const dbfn = 'C:/liceneses/licenses.sqlite'

function connect() {
    return new sqlite3.Database(dbfn);
}

module.exports = connect