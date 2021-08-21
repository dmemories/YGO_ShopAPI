const express = require('express')
const router = express.Router()
const Cards = require('../models/Cards.js')

router.put('/', async (req, res) => {
    let updateName = typeof req.body['name'] !== 'undefined'
    let updatePrice = typeof req.body['price'] !== 'undefined'
    if (!updateName && !updatePrice)
        res.json({"Error" : "Invalid all request data !"})
    else if (typeof req.body['id'] === 'undefined')
        res.json({"Error" : "Invalid Card Id !"})
    else if (req.body['id'].length !== 8)
        res.json({"Error" : "Your Card Id is not match !"})
    else if (updatePrice && req.body['price'] < 1 || req.body['price'] > 99999999)
        res.json({"Error" : "Your card price is not match !"})
    else {
        try {
            if (updateName) {
                if (req.body['name'].length < 1 || req.body['name'].length > 30) {
                    res.json({"Error" : "Your card name is too long !"})
                    return
                } 
            }

            let updateObj
            if (updateName) {
                if (updatePrice)
                    updateObj = { name: req.body['name'], price: req.body['price'] }
                else
                    updateObj = { name: req.body['name'] }
            }
            else updateObj = { price: req.body['price'] }
            
            await Cards.findOneAndUpdate({"id": req.body['id']}, updateObj, {useFindAndModify: false});
            res.json({"Result" : `Update Successfully \n${JSON.stringify(req.body)}\n`})
        }
        catch (err) {
            res.json({"Error" : err})
        }
    }
})

module.exports = router