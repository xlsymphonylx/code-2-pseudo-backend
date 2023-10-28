"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SavedTranslations", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      originalMessage: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      translationType: {
        type: Sequelize.ENUM("pseudo-to-js", "js-to-pseudo"),
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      timeLogs: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("SavedTranslations", {
      fields: ["userId"],
      type: "foreign key",
      name: "fk_user_id_saved_translations",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "SavedTranslations",
      "fk_user_id_saved_translations"
    );
    await queryInterface.dropTable("SavedTranslations");
  },
};
