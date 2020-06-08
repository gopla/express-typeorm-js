const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'Post',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    userId: {
      type: 'int',
    },
    post: {
      type: 'text',
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
      eager: true,
    },
  },
})
