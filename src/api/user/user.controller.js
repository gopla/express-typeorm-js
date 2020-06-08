const userService = require('./user.service')

module.exports = {
  index: async (req, res, next) => {
    const user = await userService.getAllUser()
    res.json(user)
  },

  store: async (req, res, next) => {
    try {
      const { name, username, password } = req.body
      const user = await userService.createUser({ name, username, password })
      res.json(user)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  show: async (req, res, next) => {
    try {
      const user = await userService.getUserByUsername(req.params.username)
      res.json(user)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  update: async (req, res, next) => {
    try {
      const { name, username, password } = req.body
      await userService.updateUser(req.params.id, {
        name,
        username,
        password,
      })
      res.json({ isSuccess: true, message: 'User updated' })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      await userService.deleteUser(req.params.id)
      res.json({ isSuccess: true, message: 'User deleted' })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  authenticate: async (req, res, next) => {
    try {
      const { username, password } = req.body
      const token = await userService.authenticateUser({ username, password })
      res.json({ isSuccess: true, token: token })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
}
