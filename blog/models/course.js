'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Course.belongsTo(models.Category);
      models.Course.hasMany(models.Chapter);
      models.Course.hasMany(models.Like);
      models.Course.belongsTo(models.User, {foreignKey: 'userId', as: 'teacher'});
    }
  };
  Course.init({
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    recommended: DataTypes.INTEGER,
    introductory: DataTypes.INTEGER,
    likesCount: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
