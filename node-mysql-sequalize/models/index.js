const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("usersdb", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate()
.then(()=>console.log('Mysql Connected'))
.catch((err)=>console.log("Error :" +err));

module.exports = sequelize;