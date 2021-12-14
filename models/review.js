'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Review.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      models.Review.belongsTo(models.Book, {
        foreignKey: 'bookId',
      });
    }
  };
  Review.init({
    status: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};