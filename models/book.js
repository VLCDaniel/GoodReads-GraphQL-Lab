'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Book.belongsToMany(models.Author, {through: 'AuthorBook'});
      models.Book.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      });
      models.Book.hasMany(models.Review, { as: 'reviews' });
    }
  };
  Book.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    authorId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};