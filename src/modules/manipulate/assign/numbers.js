const person = require('./person')
const arbete = require('./arbetstyp')
const build = require('../build')

async function numbers(content) {
    let head = content.header.toUpperCase().split(',')
    let data = { header: {}, saljare: {}, kopare: {}, arbetstyp: {} }

    data.saljare.rst = Math.max(head.indexOf("RST NUMMER FÖR SÄLJARE"), head.indexOf(" RST NUMMER FÖR SÄLJARE"))
    data.saljare.cop = Math.max(head.indexOf("COPERNICUS NUMMER FÖR SÄLJARE"), head.indexOf(" COPERNICUS NUMMER FÖR SÄLJARE"))
    data.saljare.kontakt = Math.max(head.indexOf("KONTAKTPERSON FÖR SÄLJARE"), head.indexOf(" KONTAKTPERSON FÖR SÄLJARE"))
    data.saljare.namn = Math.max(head.indexOf("NAMN FÖR SÄLJARE"), head.indexOf(" NAMN FÖR SÄLJARE"))
    data.kopare.rst = Math.max(head.indexOf("RST NUMMER FÖR KÖPARE"), head.indexOf(" RST NUMMER FÖR KÖPARE"))
    data.kopare.cop = Math.max(head.indexOf("COPERNICUS NUMMER FÖR KÖPARE"), head.indexOf(" COPERNICUS NUMMER FÖR KÖPARE"))
    data.kopare.kontakt = Math.max(head.indexOf("KONTAKTPERSON FÖR KÖPARE"), head.indexOf(" KONTAKTPERSON FÖR KÖPARE"))
    data.kopare.namn = Math.max(head.indexOf("NAMN FÖR KÖPARE"), head.indexOf(" NAMN FÖR KÖPARE"))
    data.arbetstyp.tillverkare = Math.max(head.indexOf("TILLVERKARE"), head.indexOf(" TILLVERKARE"))
    data.arbetstyp.arbetstyp = Math.max(head.indexOf("FÖRKORTNING FÖR ARBETSTYP"), head.indexOf(" FÖRKORTNING FÖR ARBETSTYP"))
    data.header.saljare = null
    data.header.kopare = null
    data.header.arbetstyp = null
    data.header.antal = Math.max(head.indexOf("ANTAL POSTER"), head.indexOf(" ANTAL POSTER"))
    data.header.typ = Math.max(head.indexOf("TYP"), head.indexOf(" TYP"))
    data.header.leverantor = Math.max(head.indexOf("LEVERANTÖR"), head.indexOf(" LEVERANTÖR"))
    data.header.text = Math.max(head.indexOf("TEXT"), head.indexOf(" TEXT"))
    data.header.info = Math.max(head.indexOf("KONTAKTINFO"), head.indexOf(" KONTAKTINFO"))
    data.header.valuta = Math.max(head.indexOf("VALUTA"), head.indexOf(" VALUTA"))
    data.header.mangd = Math.max(head.indexOf("ANTAL LICENSER"), head.indexOf(" ANTAL LICENSER"))
    data.header.inprisex = Math.max(head.indexOf("INPRIS EX. MOMS"), head.indexOf(" INPRIS EX. MOMS"))
    data.header.inprisin = Math.max(head.indexOf("INPRIS INKL. MOMS"), head.indexOf(" INPRIS INKL. MOMS"))
    data.header.procent = Math.max(head.indexOf("PROCENT (%)"), head.indexOf(" PROCENT (%)"))
    data.header.oh = Math.max(head.indexOf("OH"), head.indexOf(" OH"))
    data.header.totalt = Math.max(head.indexOf("TOTALT INKL. MOMS OCH OH"), head.indexOf(" TOTALT INKL. MOMS OCH OH"))
    data.header.fakturanum = Math.max(head.indexOf("FAKTURANUMMER"), head.indexOf(" FAKTURANUMMER"))
    data.header.kommentar = Math.max(head.indexOf("KOMMENTAR"), head.indexOf(" KOMMENTAR"))
    data.header.inpris = Math.max(head.indexOf("INTERNPRIS"), head.indexOf(" INTERNPRIS"))
    data.header.start = Math.max(head.indexOf("PERIODISERING START"), head.indexOf(" PERIODISERING START"))
    data.header.slut = Math.max(head.indexOf("PERIODISERING SLUT"), head.indexOf(" PERIODISERING SLUT"))
    data.header.perioder = Math.max(head.indexOf("PERIODISERING ANTAL MÅNADER"), head.indexOf(" PERIODISERING ANTAL MÅNADER"))
    data.header.upfront = Math.max(head.indexOf("ANTAL MÅNADER UPFRONT"), head.indexOf(" ANTAL MÅNADER UPFRONT"))
    data.header.rest = Math.max(head.indexOf("ANTAL MÅNADER RESTERANDE"), head.indexOf(" ANTAL MÅNADER RESTERANDE"))
    data.header.internfakt = Math.max(head.indexOf("INTERNFAKT. PER PERIOD"), head.indexOf(" INTERNFAKT. PER PERIOD"))
    data.header.intakt = Math.max(head.indexOf("INTAKT"), head.indexOf(" INTAKT"))
    data.header.scan = Math.max(head.indexOf("CHECK"), head.indexOf(" CHECK"))
    data.header.now = Math.max(head.indexOf("FAKTURERINGSPERIOD"), head.indexOf(" FAKTURERINGSPERIOD"))
    data.content = content.content

    data = await person(data, "saljare")
    data = await person(data, "kopare")
    data = await arbete(data)

    return build.unsorted(data)
}

module.exports = numbers