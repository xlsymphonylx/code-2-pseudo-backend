const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assuming your database configuration is in a file named database.js
const SavedTranslation = require("./SavedTranslation");
const Role = require("./Role");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });
SavedTranslation.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
