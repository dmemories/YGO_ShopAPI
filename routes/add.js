const express = require('express')
const router = express.Router()
const func = require('../functions.js')
const Cards = require('../models/Cards.js')
const moment = require('moment-timezone');
const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

router.post('/', async (req, res) => {
    if (func.hasAllEle(req.body, ['name', 'price'])) {
        if (req.body['id'].length !== 8)
            res.json({"Error" : "Your card id is not match !"})
        else if (req.body['name'].length < 1 || req.body['name'].length > 30)
            res.json({"Error" : "Your card name is too long !"})
        else if (req.body['price'] < 1 || req.body['price'] > 99999999)
            res.json({"Error" : "Your card price is not match !"})
        else {
            let query = new Cards({
                id: req.body['id'],
                name: req.body['name'],
                price: req.body['price'],
                createAt: dateThailand
            })
            try {
                let result = await query.save()
                res.json({"Result" : `Added Successfully \n${JSON.stringify(req.body)}\n`})
            }
            catch (err) {
                res.json({"Error" : err})
            }
            
        }
    }
    else {
        res.json({"Error" : "Some data is invalid !"})
    }
})

module.exports = router