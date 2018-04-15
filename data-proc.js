
var models = require("./models");
models.sequelize.sync().then(function () {
    console.log('Database synchronized.')
}).catch(function (err) {
    console.log(err)
});

var INTERVAL = 5000;

var updateCountryStatsQuery = `INSERT OR REPLACE INTO countrystats (country, count)
    SELECT country, count(*) AS count 
    FROM txns
    GROUP BY country`;

var updateCurrencyFromStatsQuery = `INSERT OR REPLACE INTO currencyfromstats (currency, count)
    SELECT currency_from, count(*) AS count 
    FROM txns
    GROUP BY currency_from`;
var updateCurrencyToStatsQuery = `INSERT OR REPLACE INTO currencytostats (currency, count)
    SELECT currency_to, count(*) AS count 
    FROM txns
    GROUP BY currency_to`;

var updateStats = function () {
    console.log('Executing batch job.');
    models.sequelize.query(updateCountryStatsQuery);
    models.sequelize.query(updateCurrencyFromStatsQuery);
    models.sequelize.query(updateCurrencyToStatsQuery);
}

setInterval(updateStats, INTERVAL);
