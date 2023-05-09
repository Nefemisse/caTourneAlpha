'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Annonces extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Soliciter, 
        { 
          foreignKey: {
            name: 'idannonces',
            allowNull: false
          }
        }
      )
      this.belongsTo(models.Categories)
    }
  }
  Annonces.init({
    idcategories: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
        allowNull: false
      }
    },
    isValidate: DataTypes.BOOLEAN,
    nomContact: DataTypes.STRING,
    emailContact: DataTypes.STRING,
    tel: DataTypes.INTEGER,
    siteWeb: DataTypes.STRING,
    siret: DataTypes.INTEGER,
    remuneration: DataTypes.DECIMAL,
    adresseTournage: DataTypes.STRING,
    ville: DataTypes.STRING,
    codePostal: DataTypes.INTEGER,
    dateDebutTournage: DataTypes.DATE,
    dateFinTournage: DataTypes.DATE,
    synopsis: DataTypes.TEXT,
    critereSelection: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Annonces',
  });
  return Annonces;
};