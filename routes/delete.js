const express = require('express')
const router = express.Router()
const Cards = require('../models/Cards.js')

router.delete('/', async (req, res) => {
    if (typeof req.body['id'] === 'undefined')
        res.json({"Error" : "Invalid Card Id !"})
    else if (req.body['id'].length !== 8)
        res.json({"Error" : "Your Card Id is not match !"})
    else {
        try {
            await Cards.deleteOne({"id": req.body['id']});
            res.json({"Result" : `Delete Successfully \n${JSON.stringify(req.body)}\n`})
        }
        catch (err) {
            res.json({"Error" : err})
        }
    }
})

module.exports = router