process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var models = require('../models')
var Transaction = models.txn;

chai.use(chaiHttp);

var newTxn = {
    "userId": "Paolo",
    "currencyFrom": "EUR",
    "currencyTo": "GBP",
    "amountSell": 4,
    "amountBuy": 1212.10,
    "rate": 0.7471,
    "originatingCountry": "IT"
}

describe('Transactions', () => {
    beforeEach((done) => {
        models.sequelize.sync().then(function () {
            // Empty the transaction table before each test
            Transaction.destroy({
                where: {},
                truncate: true
            });
            done();
        });
    });

    describe('/GET transactions', () => {
        it('Should get all the transactions', (done) => {
            chai.request(app).get('/api/txn').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/POST new transaction', function () {
        it('Insert a new transaction', function (done) {
            chai.request(app).post('/api/txn').send(newTxn).end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.eql('OK');
                done();
            });
        });
    });

    describe('/POST new transaction with timestamp', function () {
        it('Insert a new transaction with timestamp', function (done) {
            newTxn["timePlaced"] = "24-JAN-17 10:27:44";
            chai.request(app).post('/api/txn').send(newTxn).end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.eql('OK');
                done();
            });
        });
    });
});