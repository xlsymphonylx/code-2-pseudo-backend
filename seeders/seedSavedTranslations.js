const sequelize = require("../config/database");
const { SavedTranslation, User } = require("../models");

const seedSavedTranslations = async () => {
  try {
    // Find a random or the first user ID
    const randomUserId = await User.findOne({
      attributes: ["id"],
      order: [[sequelize.random()]], // To get a random user ID
      raw: true,
    });

    const savedTranslations = [
      {
        originalMessage: "Original Message 1",
        translationType: "js-to-pseudo",
        userId: randomUserId ? randomUserId.id : null, // Assuming a valid user ID
      },
      {
        originalMessage: "Original Message 2",
        translationType: "js-to-pseudo",
        userId: randomUserId ? randomUserId.id : null, // Assuming a valid user ID
      },
      // Add more saved translations as needed
    ];

    await SavedTranslation.bulkCreate(savedTranslations);

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding:", error);
  }
};

seedSavedTranslations();