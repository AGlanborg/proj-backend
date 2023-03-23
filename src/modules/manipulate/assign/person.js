const read = require('../../crud/read')
const build = require('../build')
const create = require('../../crud/create')

async function person(data, title) {
    const stored = await read.one(title)

    data.content.forEach((value, index) => {
        let content = value.split('", "')
        content[0] = content[0].replace('"', '')
        content[content.length - 1] = content[content.length - 1].replace('"', '')

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
            data.content[index] += ', "' + result[`${title}_id`] + '"'
        } else if ((rst && kontakt) || (cop && kontakt)) {
            if ((name && !rst) || (!name && !cop)) {
                name ? name = 0 : name = 1
            }

            const built = build.sorted([[`"${rst || ''}"`, `"${cop || ''}"`, `"${kontakt || ''}"`, `"${name || 0}"`]])
            let num = 1

            stored.forEach((item) => {
                num = Math.max(item[`${title}_id`], num)
            })

            title == "saljare" ? create.saljare(built) : create.kopare(built)

            data.content[index] += `, "${num + 1}"`
        } else {
            data.content[index] += `, "null"`
        }

        data.header[title] = content.length
    })

    return data
}

module.exports = person