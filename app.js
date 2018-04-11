var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sqlite = require('sqlite3');
const path = require('path');
var env = require('dotenv').load();
var port = process.env.PORT || 8080;

// models
var models = require("./models");

// routes
var txnRoute = require('./routes/txn');

// sync database
models.sequelize.sync().then(function() {
    console.log('connected to database')
}).catch(function(err) {
    console.log(err)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// transaction API routes
app.use('/txn', txnRoute);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// index path
app.get('/', function(req, res) {

    let limit = 10;   // number of records per page
    let offset = 0;
    models.txn.findAndCountAll()
        .then((data) => {
            let page = req.query.page || 1;      // page number
            let pages = Math.ceil(data.count / limit);
                offset = limit * (page - 1);

            models.txn.findAll({
                limit: limit,
                offset: offset
            })
            .then((txns) => {
                res.render('pages/index', {
                            txns: txns,
                            count: data.count,
                            pages: pages,
                            currpage: page
                        });
            });
        });
})
// .catch(function (error) {
//     res.status(500).send('Internal Server Error');
// });

app.listen(port, function(){
    console.log('app listening on port: '+port);
});

module.exports = app;