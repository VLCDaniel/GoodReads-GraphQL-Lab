'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Author.hasMany(models.Book);
    }
  };
  Author.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    description: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};