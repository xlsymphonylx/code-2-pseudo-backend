const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TranslationType = sequelize.define("TranslationTypes", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reversePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  updatedAt: {
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
});

module.exports = TranslationType;
