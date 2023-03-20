database = require('../database')

const create = {
  arbetstyp: (content) => {
    db = database()

    const sql = `INSERT INTO arbetstyp (tillverkare, arbetstyp) VALUES ${content}`;

    db.run(sql);

    db.close()
  },
  kopare: (content) => {
    db = database()

    const sql = `INSERT INTO kopare (rst, copernicus, kontakt, name) VALUES ${content}`;

    db.run(sql);

    db.close()
  },
  saljare: (content) => {
    db = database()

    const sql = `INSERT INTO saljare (rst, copernicus, kontakt, name) VALUES ${content}`;

    db.run(sql);

    db.close()
  },
  main: async (content) => {
    const mottagande = "saljare, kopare, arbetstyp, antal, typ, leverantor, text, info,"
    const oh = "valuta, mangd, inprisex, inprisin, procent, oh, totalt, fakturanum, kommentar,"
    const periodisering = "inpris, start, slut, perioder, upfront, rest, internfakt, intakt, scan, now"
    const sql = `INSERT INTO main ( ${mottagande} ${oh} ${periodisering} ) VALUES ${content}`;

    db = database()

    await db.run(sql);

    db.close()
  }
}

module.exports = create