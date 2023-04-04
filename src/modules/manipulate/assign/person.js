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
        const name = title == 'saljare' ? 1 : 0

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
        } else if (rst || cop) {
            if (content[data[title].name]) {
                name = content[data[title].name]
            }

            const built = build.sorted([[`'${rst || ""}'`, `'${cop || ""}'`, `'${kontakt || ""}'`, `'${name || 0}'`]])
            let num = 0

            stored.forEach((item) => {
                num = Math.max(item[`${title}_id`], num)
            })

            title == 'saljare' ? await create.saljare(built) : await create.kopare(built)

            data.content[x] += `,${num + 1}`
        } else {
            let temp = {}

            stored.forEach((item) => {
                if (
                    item.rst == "TEMP" &&
                    item.copernicus == "TEMP" &&
                    item.kontakt == "TEMP"
                ) {
                    Object.assign(temp, item)
                }
            })

            if (Object.values(temp).length) {
                data.content[x] += ',' + temp[`${title}_id`]
            } else {
                let num = 0

                stored.forEach((item) => {
                    num = Math.max(item[`${title}_id`], num)
                })

                title == 'saljare' ? await create.saljare("('TEMP','TEMP','TEMP','1')") : await create.kopare("('TEMP','TEMP','TEMP','1')")

                data.content[x] += `,${num + 1}`
            }
        }

        indx = content.length
    }

    data.header[title] = indx

    return data
}

module.exports = person