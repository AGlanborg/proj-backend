import parse from 'csv-parse';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import csvHeaders from 'csv-headers';

const dbfn  = process.argv[2];
const tblnm = process.argv[3];
const csvfn = process.argv[4];

const headers = await new Promise((resolve, reject) => {
    csvHeaders({
        file      : csvfn,
        delimiter : ','
    }, function(err, headers) {
        if (err) reject(err);
        else {
            resolve(headers.map(hdr => {
                // Sometimes header names are :- "Long Header Name"
                // We need to remove the "-marks
                return hdr.replace(/["]/g, '');
            }));
        }
    });
});

const db = new sqlite3.Database(dbfn);
db.on('error', err => { 
    console.log(err);
    process.exit(-1);
});
// db.on('trace', sql => {
//     console.log(sql);
// });

await new Promise((resolve, reject) => {
    db.run(`DROP TABLE IF EXISTS ${tblnm}`,
    [ ],
    err => {
        if (err) reject(err);
        else resolve();
    })
});