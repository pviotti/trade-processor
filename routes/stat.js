var express = require('express');
var CountryStat = require('../models').countrystat;
var router = express.Router();

// GET all country stat 
router.get('/', function (req, res) {
    CountryStat.findAll().then(txn => {
        res.status(200).json(txn);
    });
});

module.exports = router;