// Model for the "currencyfromstat" table, holding stats about original currency of transactions.
module.exports = function (sequelize, Sequelize) {
    var currencyFromStatSchema = sequelize.define("currencyfromstat", {
        currency: { 
            type: Sequelize.STRING,
            primaryKey: true
        },
        count: Sequelize.INTEGER
    }, {
            timestamps: false
        });
    return currencyFromStatSchema;
}


/*
CREATE TABLE currencyfromstat (
    currency VARCHAR(30) PRIMARY KEY,
    count INTEGER
);
*/