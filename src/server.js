// import * from 'reflect-metadata'
const app = require('./app')
const { connectDB } = require('./utils/database')

const port = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(port, () => {
    console.log(` -> Server running on port ${port}`)
  })
})
