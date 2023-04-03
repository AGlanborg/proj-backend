const read = require('../../crud/read')
const build = require('../build')
const create = require('../../crud/create')
const decimals = require('../decimals')

async function person(data, title) {
    let indx = 0

    for(let x = 0; x < data.content.length; x += 1) {
        const stored = await read.one(title)
        let text = data.content[x]

        if (text.includes(";")) {
            text.replaceAll(";", ",")
        }

        text = decimals(text)
        const content = text.split(',')

        const result = {}
        const rst = content[data[title].rst]
        const cop = content[data[title].cop]
        const kontakt = content[data[title].kontakt]
        const name = content[data[title].name]

        stored.forEach((item) => {
            if (
                item.rst == rst &&
                item.copernicus == cop &&
                item.kontakt == kontakt
            ) {
                Object.assign(result, item)
            }
        })

        if (Object.keys(result).length) {
            data.content[x] += ',' + result[`${title}_id`]
        } else if ((rst && kontakt) || (cop && kontakt)) {
            if ((name && !rst) || (!name && !cop)) {
                name ? name = 0 : name = 1
            }

            const built = build.sorted([[`'${rst || ""}'`, `'${cop || ""}'`, `'${kontakt || ""}'`, `'${name || 0}'`]])
            let num = 0

            stored.forEach((item) => {
                num = Math.max(item[`${title}_id`], num)
            })

            title == 'saljare' ? await create.saljare(built) : await create.kopare(built)

            data.content[x] += `,${num + 1}`
        } else {
            let temp = 0

            let obj = stored.find((item) => item.rst == "TEMP")

            if (Object.values(obj).length) {
                temp = obj[`${title}_id`]
            } else {
                title == 'saljare' ? await create.saljare("'TEMP','TEMP','TEMP','1'") : await create.kopare("'TEMP','TEMP','TEMP','1'")

                temp = Object.values(stored).length
            }

            data.content[x] += `,${temp}`
        }

        indx = content.length
    }

    data.header[title] = indx

    return data
}

module.exports = person