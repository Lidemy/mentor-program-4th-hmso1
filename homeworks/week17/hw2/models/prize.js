'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prize.init({
    name: DataTypes.STRING,
    url: DataTypes.TEXT,
    weight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prize',
  });
  return Prize;
};