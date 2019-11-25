'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      start: {
        type: Sequelize.DATE,
        defaultValue: new Date(new Date().setHours(8,0,0,0)),
        allowNull: false,
      },
      end: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.TEXT,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      release: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      // Timestamps
      created_at: {
        type: Sequelize.DATE,
        allowNull: false        
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false        
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tasks');
  }
};
