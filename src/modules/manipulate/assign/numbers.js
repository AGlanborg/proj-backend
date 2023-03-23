const person = require('./person')
const arbete = require('./arbetstyp')
const build = require('../build')

async function numbers(content) {
    let head = content.header.toUpperCase().split('", "')

    head[0] = head[0].replace('"', '')
    head[head.length - 1] = head[head.length - 1].replace('"', '')

    let data = { header: {}, saljare: {}, kopare: {}, arbetstyp: {} }

    data.saljare.rst = head.indexOf("RST NUMMER FÖR SÄLJARE")
    data.saljare.cop = head.indexOf("COPERNICUS NUMMER FÖR SÄLJARE")
    data.saljare.kontakt = head.indexOf("KONTAKTPERSON FÖR SÄLJARE")
    data.saljare.namn = head.indexOf("NAMN FÖR SÄLJARE")
    data.kopare.rst = head.indexOf("RST NUMMER FÖR KÖPARE")
    data.kopare.cop = head.indexOf("COPERNICUS NUMMER FÖR KÖPARE")
    data.kopare.kontakt = head.indexOf("KONTAKTPERSON FÖR KÖPARE")
    data.kopare.namn = head.indexOf("NAMN FÖR KÖPARE")
    data.arbetstyp.tillverkare = head.indexOf("TILLVERKARE")
    data.arbetstyp.arbetstyp = head.indexOf("FÖRKORTNING FÖR ARBETSTYP")
    data.header.saljare = null
    data.header.kopare = null
    data.header.arbetstyp = null
    data.header.antal = head.indexOf("ANTAL POSTER")
    data.header.typ = head.indexOf("TYP")
    data.header.leverantor = head.indexOf("LEVERANTÖR")
    data.header.text = head.indexOf("TEXT")
    data.header.info = head.indexOf("KONTAKTINFO")
    data.header.valuta = head.indexOf("VALUTA")
    data.header.mangd = head.indexOf("ANTAL LICENSER")
    data.header.inprisex = head.indexOf("INPRIS EX. MOMS")
    data.header.inprisin = head.indexOf("INPRIS INKL. MOMS")
    data.header.procent = head.indexOf("PROCENT (%)")
    data.header.oh = head.indexOf("OH")
    data.header.totalt = head.indexOf("TOTALT INKL. MOMS OCH OH")
    data.header.fakturanum = head.indexOf("FAKTURANUMMER")
    data.header.kommentar = head.indexOf("KOMMENTAR")
    data.header.inpris = head.indexOf("INTERNPRIS")
    data.header.start = head.indexOf("PERIODISERING START")
    data.header.slut = head.indexOf("PERIODISERING SLUT")
    data.header.perioder = head.indexOf("PERIODISERING ANTAL MÅNADER")
    data.header.upfront = head.indexOf("ANTAL MÅNADER UPFRONT")
    data.header.rest = head.indexOf("ANTAL MÅNADER RESTERANDE")
    data.header.internfakt = head.indexOf("INTERNFAKT. PER PERIOD")
    data.header.scan = head.indexOf("CHECK")
    data.header.intakt = head.indexOf("INTAKT")
    data.header.now = head.indexOf("FAKTURERINGSPERIOD")
    data.content = content.content

    data = await person(data, "saljare")
    data = await person(data, "kopare")
    data = await arbete(data)

    return build.unsorted(data)
}

module.exports = numbers