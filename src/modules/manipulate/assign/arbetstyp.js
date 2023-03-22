const read = require('../../crud/read')
const build = require('../build')
const create = require('../../crud/create')

async function arbete(data) {
    const stored = await read.one("arbetstyp")

    data.content.forEach((value, index) => {
        let content = value.split('", "')
        content[0] = content[0].replace('"', '')
        content[content.length - 1] = content[content.length - 1].replace('"', '')

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
            data.content[index] += `, "${result.arbetstyp_id}"`
        } else if (tillverkare && arbetstyp) {
            const built = build.sorted([[`"${tillverkare}"`, `"${arbetstyp}"`]])
            let num = 0

            stored.forEach((item) => {
                num = Math.max(item[`${title}_id`], num)
            })

            create.arbetstyp(built)

            data.content[index] += `, "${num + 1}"`
        } else {
            data.content[index] += `, "null"`
        }

        data.header.arbetstyp = content.length
    })

    return data
}

module.exports = arbete