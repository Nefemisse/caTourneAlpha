"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Soliciter, {
        foreignKey: "idusers",
      });
    }
  }
  Users.init(
    {
      nom: DataTypes.STRING,
      prenom: DataTypes.STRING,
      tel: DataTypes.INTEGER,
      email: DataTypes.STRING,
      adresse: DataTypes.STRING,
      ville: DataTypes.STRING,
      codePostal: DataTypes.STRING,
      nomProduction: DataTypes.STRING,
      siret: DataTypes.STRING,
      siteWeb: DataTypes.STRING,
      password: DataTypes.STRING,
      dateNaissance: DataTypes.DATE,
      nomTitulaireCompte: DataTypes.STRING,
      iban: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      photoProfil: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
