const express = require('express')
const { verifyToken } = require('../../utils/verifyToken')
const router = express.Router()

router.use(verifyToken)

const con = require('./post.controller')
const baseUrl = `/post`

router.get(`${baseUrl}`, con.index)
router.get(`${baseUrl}/:username`, con.show)
router.post(`${baseUrl}`, con.store)
router.put(`${baseUrl}/:id`, con.update)
router.delete(`${baseUrl}/:id`, con.delete)

module.exports = router
