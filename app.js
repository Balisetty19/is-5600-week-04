const fs = require('fs').promises
const path = require('path')
const express = require('express')
const api = require('./api')
const middleware = require('middleware')
// app.js
// Add body parser middleware
const bodyParser = require('body-parser')


// Set the port
const port = process.env.PORT || 3000
// Boot the app
const app = express()
// Register the public directory
app.use(middleware.corse)
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
// register the routes
app.get('/products', api.listProducts)
app.get('/', api.handleRoot);
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))

