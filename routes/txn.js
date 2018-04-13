var express = require('express');
var Txn = require('../models').txn;
var router = express.Router();

// GET all transactions (!! not scalable, just for debug)
router.get('/', function (req, res) {
    //console.log('Getting all transactions');
    Txn.findAll().then(txn => {
        res.status(200).json(txn);
    });
});

// POST a new transaction
router.post('/', function (req, res) {
    console.log(req.body);
    Txn.create({
        user_id: req.body.userId,
        currency_from: req.body.currencyFrom,
        currency_to: req.body.currencyTo,
        amount_sell: req.body.amountSell,
        amount_buy: req.body.amountBuy,
        rate: req.body.rate,
        timestamp: req.body.timePlaced,
        country: req.body.originatingCountry
    }).then(txn => {
        res.status(200).json(txn);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

module.exports = router;