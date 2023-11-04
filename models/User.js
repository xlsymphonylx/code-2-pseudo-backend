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
  profile_img: {
    type: DataTypes.STRING, // Assuming the profile image path is a string
    allowNull: true, // Set to false if it's required
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, // Adjust as needed
    unique: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true, // Set to false if it's required
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true, // Set to false if it's required
  },
});

User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });
SavedTranslation.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
