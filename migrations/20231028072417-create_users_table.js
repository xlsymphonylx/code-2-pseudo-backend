"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING, // Add email field
        allowNull: false, // Modify allowNull as per your requirements
      },
      first_name: {
        type: Sequelize.STRING, // Add first_name field
        allowNull: true, // Modify allowNull as per your requirements
      },
      last_name: {
        type: Sequelize.STRING, // Add last_name field
        allowNull: true, // Modify allowNull as per your requirements
      },
      profile_img: {
        type: Sequelize.STRING, // Add profile_img field
        allowNull: true, // Modify allowNull as per your requirements
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Roles",
          key: "id",
        },
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
