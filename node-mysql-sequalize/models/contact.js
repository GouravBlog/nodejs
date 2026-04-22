const { DataTypes } = require("sequelize");
const sequelize = require("./index");


const Contact = sequelize.define("contact", {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    phone: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    }
},
    {
        timestamps:false,
        freezeTableName:true
    }
);

module.exports = Contact;