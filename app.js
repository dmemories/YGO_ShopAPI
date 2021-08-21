const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
require('dotenv').config()
app.use(bodyParser.json())

// Routes
const addRoute = require('./routes/add.js')
const getRoute = require('./routes/get.js')
const updateRoute = require('./routes/update.js')
const deleteRoute = require('./routes/delete.js')

// Database
try {
    mongoose.connect(
        process.env.DB_CONNECT,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => { console.log('Mongoose is Running') }
    )
} catch (err) {
    console.log('\x1b[31m%s\x1b[0m', `Mongoose Error : ${err}`)
}

// Routing
app.use('/', getRoute)
app.use('/', addRoute)
app.use('/', updateRoute)
app.use('/', deleteRoute)

// Other
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})