const Sequelize = require("sequelize");
const dotenv = require('dotenv');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

sequelize.authenticate().then(()=>{
    console.log('Database Connected');
}).catch(err=>{
    console.error('Unable to connect DB');
});

module.exports = sequelize;