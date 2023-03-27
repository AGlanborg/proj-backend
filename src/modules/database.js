const sqlite3 = require('sqlite3').verbose();

function connect() {
    if (process.env.SYSTEM == "Win") {
        return new sqlite3.Database('C:/licenses/licenses.sqlite');
    } else if (process.env.SYSTEM == "Linux") {
        return new sqlite3.Database('/licenses/licenses.sqlite');
    };
};

module.exports = connect