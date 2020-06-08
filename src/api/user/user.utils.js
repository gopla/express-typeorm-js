const bcrypt = require('bcryptjs')
const saltRounds = 10

module.exports = {
  hash: async (password) => {
    return await bcrypt.hash(password, saltRounds)
  },
  compare: async (password, hash) => {
    return await bcrypt.compare(password, hash)
  },
}
