const read = require('../../crud/read')
const build = require('../build')
const create = require('../../crud/create')
const decimals = require('../decimals')

async function arbete(data) {
    let indx = 0

    for(let x = 0; x < data.content.length; x += 1) {
        const stored = await read.one("arbetstyp")
        let text = data.content[x]

        if (text.includes(";")) {
            text.replaceAll(";", ",")
        }

        text = decimals(text)
        const content = text.split(',')

        const result = {}
        const tillverkare = content[data.arbetstyp.tillverkare]
        const arbetstyp = content[data.arbetstyp.arbetstyp]

        stored.forEach((item) => {
            if (
                item.tillverkare == tillverkare &&
                item.arbetstyp == arbetstyp
            ) {
                Object.assign(result, item)
            }
        })

        if (Object.keys(result).length) {
            data.content[x] += `,${result.arbetstyp_id}`
        } else if (tillverkare && arbetstyp) {
            const built = build.sorted([[`'${tillverkare}'`, `'${arbetstyp}'`]])
            let num = 0

            stored.forEach((item) => {
                num = Math.max(item["arbetstyp_id"], num)
            })

            await create.arbetstyp(built)

            data.content[x] += `,${num + 1}`
        } else {
            data.content[x] += `,null`
        }

        indx = content.length
    }

    data.header.arbetstyp = indx

    return data
}

module.exports = arbete