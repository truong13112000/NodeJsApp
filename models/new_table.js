const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize,DataTypes)=>{
    const new_table = sequelize.define("new_table",{
        firstName:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty:true,
            },
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty:true,
            },
        },
        lastName:{
            type: DataTypes.STRING,
            validate:{
                notEmpty:true,
            },
        }
    });
    return new_table;
}