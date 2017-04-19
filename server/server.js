var express = require('express'),
  morgan = require('morgan'),
  cors = require('express-cors'),
  parser = require('body-parser'),
  helmet = require('helmet'),
  router = require('./config/routes'),
  bodyParse = require('body-parser'),
  path = require('path')

// create new app
var app = express()

// set port to process.env.PORT or 3001
app.set('port', (process.env.PORT || 3001))

// logging, security, parsing data, allowing cors for dev and prod
app.use(morgan())
app.use(helmet())
app.use(cors({
  allowedOrigins: ['http://localhost:3001', 'http://localhost:3000', 'http://www.planEats.xyz/']
}))
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

app.use(express.static('../client'))

// API route
app.use('/api', router)

// Adress bar navigation
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

// Confirm server is running
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`)
})

module.exports = app
