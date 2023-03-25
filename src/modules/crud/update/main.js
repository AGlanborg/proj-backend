const database = require('../../database')

async function main(data) {
    let sql = `UPDATE main SET `;
    sql += `saljare = '${data.saljare}', `
    sql += `kopare = '${data.kopare}', `
    sql += `arbetstyp = '${data.arbetstyp}', `
    sql += `antal = '${data.antal}', `
    sql += `typ = '${data.typ}', `
    sql += `leverantor = '${data.leverantor}', `
    sql += `text = '${data.text}', `
    sql += `info = '${data.info}', `
    sql += `valuta = '${data.valuta}', `
    sql += `mangd = '${data.mangd}', `
    sql += `inprisex = '${data.inprisex}', `
    sql += `inprisin = '${data.inprisin}', `
    sql += `procent = '${data.procent}', `
    sql += `oh = '${data.oh}', `
    sql += `totalt = '${data.totalt}', `
    sql += `fakturanum = '${data.fakturanum}', `
    sql += `kommentar = '${data.kommentar}', `
    sql += `inpris = '${data.inpris}', `
    sql += `start = '${data.start}', `
    sql += `slut = '${data.slut}', `
    sql += `perioder = '${data.perioder}', `
    sql += `internfakt = '${data.internfakt}', `
    sql += `upfront = '${data.upfront}', `
    sql += `rest = '${data.rest}', `
    sql += `intakt = '${data.intakt}', `
    sql += `scan = '${data.scan}', `
    sql += `now = '${data.now}' `
    sql += `WHERE main_id = ${parseInt(data.main_id)}`

    db = database()

    await db.run(sql);

    db.close()
}

module.exports = main