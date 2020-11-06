'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Course);
      models.User.hasMany(models.Article);
      models.User.belongsToMany(models.Course, { as: 'likeCourses', through: 'likes', foreignKey: 'userId' })
      models.User.belongsToMany(models.Course, { as: 'historyCourses', through: 'histories', foreignKey: 'userId' })
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
