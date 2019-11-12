'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
        unique: {
          args: true,
          msg: 'Email address already in use!'
        }
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
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
    }, {
      defaultScope: {
        attributes: { exclude: ['password_hash'] }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
