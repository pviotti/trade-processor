
var models = require("./models");
models.sequelize.sync().then(function () {
    console.log('Database synchronized.')
}).catch(function (err) {
    console.log(err)
});

var updateCountryStatsQuery = `INSERT OR REPLACE INTO countrystats (country, count)
    SELECT country, count(*) AS count 
    FROM txns
    GROUP BY country`;

var updateStats = function() {
    console.log('Executing batch job.');

    models.sequelize.query(updateCountryStatsQuery).spread((results, metadata) => {
        console.log("update md: " + JSON.stringify(metadata))
    });
}

setInterval(updateStats, 5000);
