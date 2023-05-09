'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      // define association here      
      this.hasMany(models.Annonces, 
        { 
          foreignKey: 'idcategories' 
        }
      )
    }
  }
  Categories.init({
    nom: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};