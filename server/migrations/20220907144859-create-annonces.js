'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Annonces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idcategories: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      isValidate: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      nomContact: {
        allowNull: false,
        type: Sequelize.STRING
      },
      emailContact: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tel: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      siteWeb: {
        allowNull: true,
        type: Sequelize.STRING
      },
      siret: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ville: {
        allowNull: false,
        type: Sequelize.STRING
      },
      codePostal: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      synopsis: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      remuneration: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      critereSelection: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      dateDebutTournage: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      dateFinTournage: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      adresseTournage: {
        allowNull: false,
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
    await queryInterface.dropTable('Annonces');
  }
};