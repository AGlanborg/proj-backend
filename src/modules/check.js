const validate = require('./manipulate/validate')
const build = require('./manipulate/build')

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