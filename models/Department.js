const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const Department = sequelize.define("departments", {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
    },
    name: {
        type: Sequelize.STRING,
        allownull: false
    }
      
},{
    paranoid: true
});