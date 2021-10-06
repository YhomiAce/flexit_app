const sequelize = require("../config/db");
const Sequelize = require("sequelize");
const Department = require("./Department");

const Staff = sequelize.define("staffs", {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
    },
    name: {
        type: Sequelize.STRING,
        allownull: false
    },
    email: {
        type: Sequelize.STRING,
        allownull: false
    },
    role: {
        type: Sequelize.INTEGER,
        allownull: true,
        defaultValue: 1
    },
    password: {
        type: Sequelize.STRING,
        allownull: false
    },
    departmentId: {
        type: Sequelize.UUID,
        allownull: false
    },
    status: {
        type: Sequelize.ENUM("free", "busy", "checkout"),
        defaultValue: "free",
        allownull: false
    },
    
},{
    paranoid: true
});

Staff.belongsTo(Department, {
    foreignKey: "departmentId",
    as: "department"
});

// Staff.sync({force:true})

module.exports = Staff