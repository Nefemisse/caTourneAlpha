'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prenom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tel: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      adresse: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ville: {
        allowNull: false,
        type: Sequelize.STRING
      },
      codePostal: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nomProduction: {
        allowNull: true,
        type: Sequelize.STRING
      },
      siret: {
        allowNull: true,
        type: Sequelize.STRING
      },
      siteWeb: {
        allowNull: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateNaissance: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      nomTitulaireCompte: {
        allowNull: true,
        type: Sequelize.STRING
      },
      iban: {
        allowNull: true,
        type: Sequelize.STRING
      },
      isAdmin: {
        allowNull: true,
        type: Sequelize.STRING
      },
      photoProfil: {
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
    await queryInterface.dropTable('Users');
  }
};