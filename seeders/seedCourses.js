const { Course, SavedTranslation } = require("../models");

const seedCourses = async () => {
  try {
    const savedTranslation = await SavedTranslation.findOne(); // Get an existing SavedTranslations entry

    if (!savedTranslation) {
      throw new Error("No existing SavedTranslation found.");
    }
    const courses = [
      {
        name: "Course 1",
        description: "Description for Course 1",
        availableDate: null,
        official: true,
        savedTranslationId: savedTranslation.id,
      },
      {
        name: "Course 2",
        description: "Description for Course 2",
        availableDate: new Date("2023-11-01"),
        savedTranslationId: savedTranslation.id,
        official: false,
      },
      // Add more courses as needed
    ];

    for (const course of courses) {
      const createdCourse = await Course.create(course);
      await createdCourse.setSavedTranslation(savedTranslation);
    }

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding:", error);
  }
};

seedCourses();
