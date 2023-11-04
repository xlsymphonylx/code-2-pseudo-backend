const bcrypt = require("bcrypt");
const { User, Role } = require("../models");

const seedUsersRoles = async () => {
  try {
    // Seed Roles
    const roles = [
      { name: "admin", createdAt: new Date(), updatedAt: new Date() },
      { name: "free_client", createdAt: new Date(), updatedAt: new Date() },
      { name: "tier_1", createdAt: new Date(), updatedAt: new Date() },
      { name: "tier_2", createdAt: new Date(), updatedAt: new Date() },
      { name: "tier_3", createdAt: new Date(), updatedAt: new Date() },
    ];

    await Role.bulkCreate(roles);

    // Seed User
    const adminRole = await Role.findOne({ where: { name: "admin" } });
    if (adminRole) {
      const adminUser = {
        username: "admin",
        password: await bcrypt.hash("1234", 10),
        roleId: adminRole.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        profile_img: "uploads/default_user.jpg", // Add a default profile image path
        email: "admin@system.dom",
        first_name: "Admin",
        last_name: "User",
      };

      await User.create(adminUser);
    }

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding:", error);
  }
};

seedUsersRoles();
