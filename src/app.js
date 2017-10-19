const express = require('express')
const helmet = require('helmet')

const routes = require('./routes')

const app = express()

app.use(helmet())
app.use(express.static('public'))

app.use(routes)

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  if (app.get('env') !== 'development') {
    res.send(error.message)
  } else {
    res.send(error)
  }
})

module.exports = app
