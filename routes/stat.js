var express = require('express');
var CountryStat = require('../models').countrystat;
var CurrencyFromStat = require('../models').currencyfromstat;
var CurrencyToStat = require('../models').currencytostat;
var router = express.Router();

// GET all country stat 
router.get('/country', function (req, res) {
    CountryStat.findAll().then(txn => {
        /*
        Convert JSON format from:
            [{"country":"CF","count":1},{"country":"FR","count":2}]
        to:
            {"CF" : 1, "FR": 2}
         */
        var output = {};
        for (var i = 0; i < txn.length; i++)
            output[txn[i].country] = txn[i].count;
        res.status(200).json(output);
    });
});

// GET all currency_from stat
router.get('/currencyfrom', function (req, res) {
    CurrencyFromStat.findAll().then(txn => {
        var output = {};
        for (var i = 0; i < txn.length; i++)
            output[txn[i].currency] = txn[i].count;
        res.status(200).json(output);
    });
});

// GET all currency_to stat
router.get('/currencyto', function (req, res) {
    CurrencyToStat.findAll().then(txn => {
        var output = {};
        for (var i = 0; i < txn.length; i++)
            output[txn[i].currency] = txn[i].count;
        res.status(200).json(output);
    });
});

module.exports = router;