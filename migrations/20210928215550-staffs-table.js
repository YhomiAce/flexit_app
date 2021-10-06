'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('staffs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('staffs');
  }
};
