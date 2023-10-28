"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Courses", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      availableDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      official: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      savedTranslationId: {
        // Adding the foreign key column
        type: Sequelize.UUID, // Assuming savedTranslationId is stored as UUID
        allowNull: false,
        references: {
          model: "SavedTranslations", // Assuming the model name is 'SavedTranslations'
          key: "id", // Assuming the primary key in SavedTranslations is 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

    // Add the foreign key constraint
    await queryInterface.addConstraint("Courses", {
      fields: ["savedTranslationId"],
      type: "foreign key",
      name: "custom_fkey_savedTranslations", // You can choose a custom name for the foreign key constraint
      references: {
        table: "SavedTranslations",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Courses",
      "custom_fkey_savedTranslations"
    ); // Drop the foreign key constraint
    await queryInterface.dropTable("Courses"); // Drop the table
  },
};
