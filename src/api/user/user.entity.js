const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'User',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    username: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
  },
})
