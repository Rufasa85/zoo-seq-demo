const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class Zoo extends Model {}

Zoo.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        }
    }
},{
    sequelize,
    hooks:{
        beforeCreate: zooObj=>{
            console.log(zooObj)
            zooObj.password = bcrypt.hashSync(zooObj.password,3);
            return zooObj;
        }
    }
});

module.exports=Zoo