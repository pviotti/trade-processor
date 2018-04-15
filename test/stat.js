process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var models = require('../models')

var CountryStat = models.countrystat;
var CurrencyFrom = models.currencyfromstat;
var CurrencyTo = models.currencytostat;

chai.use(chaiHttp);

describe('Stats', () => {
    beforeEach((done) => {
        models.sequelize.sync().then(function () {
            CountryStat.destroy({
                where: {},
                truncate: true
            });
            CurrencyFrom.destroy({
                where: {},
                truncate: true
            });
            CurrencyTo.destroy({
                where: {},
                truncate: true
            });
            done();
        });
    });

    describe('/GET stats', () => {
        it('Should get country stats', (done) => {
            chai.request(app).get('/api/stat/country').end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        it('Should get currencyfrom stats', (done) => {
            chai.request(app).get('/api/stat/currencyfrom').end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        it('Should get currencyto stats', (done) => {
            chai.request(app).get('/api/stat/currencyto').end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });
});