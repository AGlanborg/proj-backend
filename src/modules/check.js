const validate = require('./validate')
const build = require('./build')

const check = {
  upload: (content) => {
    if (content.guide) {
      return build.sorted(content.content)
    } else {
      return validate.validate(content)
    }
  }
}

module.exports = check