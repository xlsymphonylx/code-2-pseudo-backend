const User = require("./User");
const SavedTranslation = require("./SavedTranslation");
const Course = require("./Course");
const Role = require("./Role");

// Define associations here
User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });
SavedTranslation.belongsTo(User, { foreignKey: "userId" });
Course.belongsTo(SavedTranslation, { foreignKey: "savedTranslationId" });

module.exports = {
  User,
  SavedTranslation,
  Role,
  Course,
};
