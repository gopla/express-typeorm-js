const express = require('express')
const userRouter = require('./api/user/user.router')
const postRouter = require('./api/post/post.router')

const app = express()

app.use(express.json())
app.get(`/`, (req, res) => {
  res.json({
    isSucces: true,
    message: 'Hello, World!',
  })
})
app.use(userRouter)
app.use(postRouter)

module.exports = app
