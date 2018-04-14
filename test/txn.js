var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var Transaction = require('../models').txn;

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
        // Empty the transaction table before each test
        Transaction.destroy({
            where: {},
            truncate: true
        });
        done();
    });

    describe('/GET transactions', () => {
        it('it should GET all the transactions', (done) => {
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