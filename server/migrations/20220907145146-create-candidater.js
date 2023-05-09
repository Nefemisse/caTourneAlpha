'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Candidater', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idusers: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      idannonces: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Annonces',
          key: 'id'
        }
      },
      etat: {
        allowNull: true,
        type: Sequelize.STRING
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tel: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      photo1: {
        allowNull: true,
        type: Sequelize.STRING
      },
      photo2: {
        allowNull: true,
        type: Sequelize.STRING
      },
      candidature: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      etatAnnonce: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Candidater');
  }
};