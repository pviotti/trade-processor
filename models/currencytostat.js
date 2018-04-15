// Model for the "currencytostat" table, holding stats about final currency of transactions.
module.exports = function (sequelize, Sequelize) {
    var currencyToStatSchema = sequelize.define("currencytostat", {
        currency: { 
            type: Sequelize.STRING,
            primaryKey: true
        },
        count: Sequelize.INTEGER
    }, {
            timestamps: false
        });
    return currencyToStatSchema;
}


/*
CREATE TABLE currencytostat (
    currency VARCHAR(30) PRIMARY KEY,
    count INTEGER
);
*/