const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.json())

// Routes
const addRoute = require('./routes/add.js')
const getRoute = require('./routes/get.js')

// Database
try {
    mongoose.connect(
        'mongodb+srv://root:1234@mycluster.sr4nd.mongodb.net/cardshop?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => { console.log('Mongoose is Running') }
    )
} catch (err) {
    console.log('\x1b[31m%s\x1b[0m', `Mongoose Error : ${err}`)
}

// Routing
app.use('/', getRoute)
app.use('/add', addRoute)

// Other
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})