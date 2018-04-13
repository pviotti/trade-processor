var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
var favicon = require('serve-favicon');
var env = require('dotenv').load();
var port = process.env.PORT || 8080;

// models
var models = require("./models");
models.sequelize.sync().then(function () {
    console.log('Database synchronized.')
}).catch(function (err) {
    console.log(err)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// API routes
var txnRoute = require('./routes/txn');
var statRoute = require('./routes/stat');
app.use('/api/txn', txnRoute);
app.use('/api/stat', statRoute);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.set('view engine', 'ejs');

app.get('/submit', function (req, res) {
    res.render('pages/submit');
});
app.get('/graphs', function (req, res) {
    res.render('pages/graphs');
});

// index path
app.get('/', function (req, res) {
    let limit = 10;   // number of records per page
    let offset = 0;
    models.txn.count()
        .then(c => {
            let page = req.query.page || 1;      // page number
            let pages = Math.ceil(c / limit);
            offset = limit * (page - 1);

            models.txn.findAll({
                limit: limit,
                offset: offset,
                order: [['timestamp', 'DESC']]
            })
                .then((txns) => {
                    res.render('pages/index', {
                        txns: txns,
                        count: c,
                        pages: pages,
                        currpage: page
                    });
                });
        });
});

app.listen(port, function () {
    console.log('app listening on port: ' + port);
});

module.exports = app;