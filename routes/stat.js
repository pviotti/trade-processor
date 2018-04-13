var express = require('express');
var CountryStat = require('../models').countrystat;
var router = express.Router();

// GET all country stat 
router.get('/', function (req, res) {
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

module.exports = router;