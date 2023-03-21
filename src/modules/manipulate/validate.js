const sort = require('./sort')

const validate = {
    validate: (content) => {
        let head = content.header.toUpperCase().split('", "')

        head[0] = head[0].replace('"', '')
        head[head.length - 1] = head[head.length - 1].replace('"', '')

        let data = { header: {} }

        data.header.saljare = Math.max(head.indexOf("SÄLJARE"), head.indexOf("SALJARE"))
        data.header.kopare = Math.max(head.indexOf("KÖPARE"), head.indexOf("KOPARE"))
        data.header.arbetstyp = head.indexOf("ARBETSTYP")
        data.header.antal = Math.max(head.indexOf("ANTAL"), head.indexOf("ANTAL POSTER"))
        data.header.typ = head.indexOf("TYP")
        data.header.leverantor = Math.max(head.indexOf("LEVERANTÖR"), head.indexOf("LEVERANTOR"))
        data.header.text = head.indexOf("TEXT")
        data.header.info = Math.max(head.indexOf("KONTAKTINFO"), head.indexOf("INFO"))
        data.header.valuta = head.indexOf("VALUTA")
        data.header.mangd = Math.max(head.indexOf("ANTAL LICENSER"), head.indexOf("MANGD"))
        data.header.inprisex = Math.max(head.indexOf("INPRIS EX. MOMS"), head.indexOf("INPRISEX"))
        data.header.inprisin = Math.max(head.indexOf("INPRIS INKL. MOMS"), head.indexOf("INPRISIN"))
        data.header.procent = Math.max(head.indexOf("PROCENT (%)"), head.indexOf("PROCENT"))
        data.header.oh = head.indexOf("OH")
        data.header.totalt = Math.max(head.indexOf("TOTALT INKL. MOMS OCH OH"), head.indexOf("TOTALT"))
        data.header.fakturanum = Math.max(head.indexOf("FAKTURANUMMER"), head.indexOf("FAKTURANUM"))
        data.header.kommentar = head.indexOf("KOMMENTAR")
        data.header.inpris = Math.max(head.indexOf("INTERNPRIS"), head.indexOf("INPRIS"))
        data.header.start = Math.max(head.indexOf("PERIODISERING START"), head.indexOf("START"))
        data.header.slut = Math.max(head.indexOf("PERIODISERING SLUT"), head.indexOf("SLUT"))
        data.header.perioder = Math.max(head.indexOf("PERIODISERING ANTAL MÅNADER"), head.indexOf("PERIODER"))
        data.header.internfakt = Math.max(head.indexOf("INTERNFAKT. PER PERIOD"), head.indexOf("INTERNFAKT"))
        data.header.upfront = Math.max(head.indexOf("ANTAL MÅNADER UPFRONT"), head.indexOf("UPFRONT"))
        data.header.rest = Math.max(head.indexOf("ANTAL MÅNADER RESTERANDE"), head.indexOf("REST"))
        data.header.intakt = head.indexOf("INTAKT")
        data.header.check = Math.max(head.indexOf("CHECK"), head.indexOf("SCAN"))
        data.header.now = Math.max(head.indexOf("FAKTURERINGSPERIOD"), head.indexOf("NOW"))
        data.content = content.content

        return sort(data)
    }
}

module.exports = validate