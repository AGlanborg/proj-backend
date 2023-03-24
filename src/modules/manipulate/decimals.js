function handle(text) {
    while (text.includes('"')) {
        let index = text.indexOf('"')
        let first = text.slice(0, index)
        let second = text.slice(index)

        second = second.replace(',', '.').replace('"', '').replace('"', '')
        text = first + second
    }

    while (text.includes("'")) {
        let index = text.indexOf("'")
        let first = text.slice(0, index)
        let second = text.slice(index)

        second = second.replace(',', '.').replace("'", '').replace("'", '')
        text = first + second
    }

    return text
}

module.exports = handle