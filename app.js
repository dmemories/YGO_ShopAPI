const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('...')
})

app.post('/', (req, res) => {
    res.json({result: req.body.name})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})