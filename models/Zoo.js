const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Zoo extends Model {}

Zoo.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false
    }
},{
    sequelize
});

module.exports=Zoo