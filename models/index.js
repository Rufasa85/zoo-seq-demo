const Animal = require("./Animal");
const Zoo = require("./Zoo");

Animal.belongsTo(Zoo,{
    onDelete:"CASCADE"
});
Zoo.hasMany(Animal);

module.exports = {
    Animal:Animal,
    Zoo:Zoo
}