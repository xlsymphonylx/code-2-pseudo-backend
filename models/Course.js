const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Course = sequelize.define("Course", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  availableDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  official: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
module.exports = Course;
