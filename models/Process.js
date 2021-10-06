const sequelize = require("../config/db");
const Sequelize = require("sequelize");
const Department = require("./Department");
const Customer = require("./Customer");
const Staff = require("./Staff");

const Process = sequelize.define("processes", {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
    },
    customerId: {
        type: Sequelize.UUID,
        allownull: false
    },
    number: {
        type: Sequelize.STRING,
        allownull: false
    },
    currentId: {
        type: Sequelize.UUID,
        allownull: true
    },
    beforeId: {
        type: Sequelize.UUID,
        allownull: true
    },
    afterId: {
        type: Sequelize.UUID,
        allownull: true
    },
    dateIn: {
        type: Sequelize.DATE,
        allownull: false
    },
    timeIn: {
        type: Sequelize.TIME,
        allownull: false
    },
    dateOut: {
        type: Sequelize.DATE,
        allownull: false
    },
    timeOut: {
        type: Sequelize.TIME,
        allownull: false
    },
    status: {
        type: Sequelize.ENUM("waiting", "busy", "checkout"),
        defaultValue: "waiting",
        allownull: false
    },
    attendantId: {
        type: Sequelize.UUID,
        allownull: false
    },
    
},{
    paranoid: true
});

Process.belongsTo(Department, {
    foreignKey: "currentId",
    as: "current"
});

Process.belongsTo(Department, {
    foreignKey: "beforeId",
    as: "before"
});

Process.belongsTo(Department, {
    foreignKey: "afterId",
    as: "after"
});

Process.belongsTo(Customer, {
    foreignKey: "customerId",
    as: "customer"
});

Process.belongsTo(Staff, {
    foreignKey: "attendantId",
    as: "staff"
});

// Process.sync({force:true})

module.exports = Process