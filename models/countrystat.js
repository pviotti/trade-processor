// Model for the "countrystat" table, holding stats about transactions' country of origin.
module.exports = function (sequelize, Sequelize) {
    var countryStatSchema = sequelize.define("countrystat", {
        country: { 
            type: Sequelize.STRING,
            primaryKey: true
        },
        count: Sequelize.INTEGER
    }, {
            timestamps: false
        });
    return countryStatSchema;
}


/*
CREATE TABLE countrystat (
    country VARCHAR(30) PRIMARY KEY,
    count INTEGER
);
*/