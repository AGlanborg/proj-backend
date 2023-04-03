const decimals = require('./decimals')

const build = {
    unsorted: (data) => {
        let text = ''
        const val = Object.values(data.content)

        for (let i = 0; i < val.length; i += 1) {
            let row = val[i]
            const head = Object.values(data.header)
            const titles = Object.keys(data.header)

            row = decimals(row)

            rowArr = row.split(',')
            text = text + "('"

            for (let n = 0; n < head.length; n += 1) {
                if ((titles[n] == "start" || titles[n] == "slut" || titles[n] == "now") && rowArr[head[n]].includes("/")) {
                    rowArr[head[n]].replaceAll("/", "-")
                }

                text = text + rowArr[head[n]] + "','"
            }

            text = text.substring(0, text.length - 3)
            text = text + "'),\n"
        };

        text = text.substring(0, text.length - 2)

        return text
    },
    sorted: (data) => {
        let text = ""
        let rows = []

        if (data.includes("\n")) {
            rows = data.split("\n")
        } else if (typeof data == "string") {
            rows.push(data)
        } else if (Array.isArray(data)){
            rows = data
        }

        for (i = 0; i < rows.length; i += 1) {
            text = text + "(" + rows[i] + "),\n"
        }

        text = text.substring(0, text.length - 2)

        return text
    }
}

module.exports = build