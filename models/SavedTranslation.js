const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Course = require("./Course");

const SavedTranslation = sequelize.define("SavedTranslations", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  originalMessage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  translationType: {
    type: DataTypes.ENUM("pseudo-to-js", "js-to-pseudo"),
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID, // Assuming userId is stored as UUID
    allowNull: false,
  },
  timeLogs: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
Course.belongsTo(SavedTranslation, { foreignKey: 'savedTranslationId' });
module.exports = SavedTranslation;
