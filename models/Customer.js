const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const Customer = sequelize.define("customers", {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
    },
    name: {
        type: Sequelize.STRING,
        allownull: false
    },
    phone: {
        type: Sequelize.STRING,
        allownull: true
    },
    email: {
        type: Sequelize.STRING,
        allownull: true
    },
    purpose: {
        type: Sequelize.TEXT,
        allownull: true
    },
    status: {
        type: Sequelize.ENUM("waiting", "processing", "checkout"),
        defaultValue: "waiting",
        allownull: false
    },
    queueNo: {
        type: Sequelize.STRING,
        allownull: true
    },
    
},{
    paranoid: true
});

module.exports = Customer