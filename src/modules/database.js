const sqlite3 = require('sqlite3').verbose();

function connect() {
    if (process.env.SYSTEM == "Linux") {
        return new sqlite3.Database('/licenses/licenses.sqlite');
    } else if (process.env.OS == "Windows_NT") {
        return new sqlite3.Database('C:/licenses/licenses.sqlite');
    };
};

module.exports = connect