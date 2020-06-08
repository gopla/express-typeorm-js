require('dotenv').config()
const { set } = require('./httpException')
const jwt = require('jsonwebtoken')

module.exports = {
  verifyToken: async (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    const token = bearerHeader ? bearerHeader.split(' ')[1] : undefined
    if (token) {
      await jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) throw err
        req.user = payload
        next()
      })
    } else {
      res.status(403).json(set(403, 'Forbidden Access'))
    }
  },
}
