const User = require("./User");
const SavedTranslation = require("./SavedTranslation");
const Course = require("./Course");
const Role = require("./Role");
const TranslationType = require("./TranslationType");

// Define associations here
User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });
SavedTranslation.belongsTo(User, { foreignKey: "userId" });
Course.belongsTo(SavedTranslation, { foreignKey: "savedTranslationId" });
SavedTranslation.belongsTo(TranslationType, {
  foreignKey: "translationTypeId",
});
module.exports = {
  User,
  SavedTranslation,
  Role,
  Course,
  TranslationType,
};
