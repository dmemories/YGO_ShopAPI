const express = require('express')
const router = express.Router()
const Cards = require('../models/Cards.js')

router.get('/', async (req, res) => {
    try {
        let result = await Cards.find()
        res.json(result)
    } catch (err) {
        res.json({"Error" : err})
    }
})

router.get('/:cardId', async (req, res) => {
    try {
        let result = await Cards.find({"id": req.params.cardId})
        res.json(result.length > 0 ? result : {"Error" : "Card id is not found !"})
    } catch (err) {
        res.json({"Error" : err})
    }
})

module.exports = router