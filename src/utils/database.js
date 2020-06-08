const { createConnection, getConnection, getRepository } = require('typeorm')
const { hash } = require('../api/user/user.utils')
const User = require('../api/user/user.entity')

module.exports = {
  connectDB: async () => {
    return await createConnection()
  },

  connectTestDB: async () => {
    return await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      logging: false,
      entities: ['./src/api/**/**.entity.js'],
    })
  },

  mockingDBRecord: async () => {
    const hashPass = await hash('123')
    await getRepository(User).save({
      name: 'gopla',
      username: 'gopla',
      password: hashPass,
    })
  },

  closeDB: async () => {
    return await getConnection().close()
  },
}
