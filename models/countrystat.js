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