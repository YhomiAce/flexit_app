'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('processes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
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
    await queryInterface.dropTable('processes');
  }
};
