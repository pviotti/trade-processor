module.exports = function (sequelize, Sequelize) {
    var transactionSchema = sequelize.define("txn", {
        user_id: Sequelize.STRING,
        currency_from: Sequelize.STRING,
        currency_to: Sequelize.STRING,
        amount_sell: Sequelize.FLOAT,
        amount_buy: Sequelize.FLOAT,
        rate: Sequelize.FLOAT,
        timestamp: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        country: Sequelize.STRING
    }, {
            timestamps: false
        });
    return transactionSchema;
}


// CREATE TABLE txn (
//     user_id VARCHAR(30),
//     currency_from VARCHAR(5),
//     currency_to VARCHAR(5),
//     amount_sell FLOAT,
//     amount_buy FLOAT,
//     rate FLOAT,
//     timestamp VARCHAR(30),
//     country VARCHAR(30)
// );