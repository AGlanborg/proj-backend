const build = require('./build')

function sort(data) {
    let indexes = Object.values(data.header)
    let unused = []

    for (let i = 0; i < Math.max(indexes); i += 1) {
        if (!indexes.includes(i)) {
            unused.push(i)
        }
    }

    Object.entries(data.header).forEach((key, value) => {
        if (value == -1) {
            data.header[key] = unused.shift()
        }
    })

    return build.unsorted(data)
}


module.exports = sort