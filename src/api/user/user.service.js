const { set } = require('../../utils/httpException')
const { hash, compare } = require('./user.utils')
const { getRepository } = require('typeorm')
const User = require('./user.entity')
const jwt = require('jsonwebtoken')

function getUsername(username) {
  return getRepository(User).find({ where: { username: username } })
}

module.exports = {
  getUserByUsername: async (username) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = getRepository(User).find({
          where: { username: username },
        })
        resolve(userDoc)
      } catch (error) {
        reject(set(302, error))
      }
    })
  },

  getAllUser: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await getRepository(User).find()
        resolve(userDoc)
      } catch (error) {
        reject(set(302, error))
      }
    })
  },

  createUser: async (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const isUserExist = await getUsername(user.username)

        if (isUserExist[0]) {
          reject(set(302, 'Username already exist'))
          return
        }

        const hashedPass = await hash(user.password)

        const userDoc = await getRepository(User).save({
          name: user.name,
          username: user.username,
          password: hashedPass,
        })
        resolve(userDoc)
      } catch (error) {
        reject(set(302, error))
      }
    })
  },

  updateUser: async (id, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const isUserExist = await getUsername(user.username)

        if (isUserExist[0]) {
          reject(set(302, 'Username already exist'))
          return
        }

        const hashedPass = await hash(user.password)

        const userDoc = await getRepository(User).update(id, {
          name: user.name,
          username: user.username,
          password: hashedPass,
        })
        resolve(userDoc)
      } catch (error) {
        reject(set(302, error))
      }
    })
  },

  deleteUser: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = getRepository(User).delete(id)
        resolve(userDoc)
      } catch (error) {
        reject(set(302, error))
      }
    })
  },

  authenticateUser: async (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await getUsername(user.username)
        if (!userDoc[0]) {
          reject(set(404, 'Username not found'))
          return
        }

        const isPasswordMatch = await compare(
          user.password,
          userDoc[0].password
        )
        if (!isPasswordMatch) {
          reject(set(302, 'Wrong password'))
          return
        }

        const token = jwt.sign(
          {
            id: userDoc[0].id,
            name: userDoc[0].name,
            username: userDoc[0].username,
          },
          process.env.JWT_SECRET || ''
        )
        resolve(token)
      } catch (error) {
        reject(set(302, error))
      }
    })
  },
}
