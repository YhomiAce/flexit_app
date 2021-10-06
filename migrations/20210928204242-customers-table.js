'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('customers');
  }
};
