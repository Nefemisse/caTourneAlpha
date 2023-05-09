'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Soliciter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, 
        {
          foreignKey : "idusers"
        }
      )
      this.belongsTo(models.Annonces, 
        {
          foreignKey : "idannonces"
        }
      )
    }
  }
  Soliciter.init({
    idusers: DataTypes.INTEGER,
    idannonces: DataTypes.INTEGER,
    etat: DataTypes.STRING,
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.INTEGER,
    photo1: DataTypes.BLOB,
    photo2: DataTypes.BLOB,
    candidature: DataTypes.TEXT,
    etatAnnonce: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Soliciter',
  });
  return Soliciter;
};