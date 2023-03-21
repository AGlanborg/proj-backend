const build = {
    unsorted: (data) => {
        let text = ''
        const val = Object.values(data.content)

        for (let i = 0; i < val.length; i += 1) {
            let row = val[i].toUpperCase().split('", "')
            const head = Object.values(data.header)

            text = text + '("'
            row[0] = row[0].replace('"', '')
            row[row.length - 1] = row[row.length - 1].replace('"', '')

            for (let n = 0; n < head.length; n += 1) {
                text = text + row[head[n]] + '", "'
            }

            text = text.substring(0, text.length - 3)
            text = text + "),\n"
        };

        text = text.substring(0, text.length - 2)

        return text
    },
    sorted: (data) => {
        let text = ""

        for (i = 0; i < data.length; i += 1) {
            text = text + "(" + data[i] + "),\n"
        }

        text = text.substring(0, text.length - 2)

        return text
    }
}

module.exports = build