const build = require('./build')
const decimals = require('./decimals')

async function cal(data) {
  let indx = 0

  for (let i = 0; i < data.content.length; i += 1) {
    let text = data.content[i]

    if (text.includes(";")) {
      text.replaceAll(";", ",")
    }

    text = decimals(text)
    const content = text.split(',')

    let start = content[data.header.start]
    let slut = content[data.header.slut]
    let now = content[data.header.now]

    if (start.includes("/")) {
      start.replaceAll("/", "-")
    }
    if (slut.includes("/")) {
      slut.replaceAll("/", "-")
    }
    if (now.includes("/")) {
      now.replaceAll("/", "-")
    }

    start = start.split("-")
    slut = slut.split("-")
    now = now.split("-")

    const inprisex = parseFloat(
      Math.round(content[data.header.inprisex] * 100) / 100
    ).toFixed(2)
    const inprisin = parseFloat(
      Math.round(inprisex * 1.25 * 100) / 100
    ).toFixed(2)
    const oh = parseFloat(
      Math.round(inprisin * (content[data.header.procent] / 100) * 100) / 100
    ).toFixed(2);
    const totalt = parseFloat(
      Math.round(parseInt(content[data.header.mangd]) * (parseFloat(inprisin) + parseFloat(oh)) * 100) / 100
    ).toFixed(2);
    const inpris = Math.round(totalt);
    const perioder = 12 * (parseInt(slut[0]) - parseInt(start[0])) + parseInt(slut[1]) - parseInt(start[1]) + 1;
    const internfakt = Math.round(totalt / perioder);
    let upfront = 12 * (parseInt(now[0]) - parseInt(start[0])) + parseInt(now[1]) - parseInt(start[1]) + 1;

    if (upfront < 0) {
      upfront = 0;
    }

    const rest = perioder - upfront

    const intakt = upfront * internfakt + rest * internfakt
    const scan = internfakt * perioder - inpris

    data.content[i] += `,${inprisex}`
    data.content[i] += `,${inprisin}`
    data.content[i] += `,${oh}`
    data.content[i] += `,${totalt}`
    data.content[i] += `,${inpris}`
    data.content[i] += `,${perioder}`
    data.content[i] += `,${internfakt}`
    data.content[i] += `,${upfront}`
    data.content[i] += `,${rest}`
    data.content[i] += `,${intakt}`
    data.content[i] += `,${scan}`

    indx = content.length
  }

  data.header.inprisex = indx
  data.header.inprisin = indx + 1
  data.header.oh = indx + 2
  data.header.totalt = indx + 3
  data.header.inpris = indx + 4
  data.header.perioder = indx + 5
  data.header.internfakt = indx + 6
  data.header.upfront = indx + 7
  data.header.rest = indx + 8
  data.header.intakt = indx + 9
  data.header.scan = indx + 10

  return build.unsorted(data)
}


module.exports = cal