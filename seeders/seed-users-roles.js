const bcrypt = require("bcrypt");
const { User, Role } = require("../models");

const seedUsersRoles = async () => {
  try {
    // Seed Roles
    const roles = ["admin", "free_client", "tier_1", "tier_2", "tier_3"];
    await Role.bulkCreate(roles.map((name) => ({ name })));

    // Seed User
    const adminRole = await Role.findOne({ where: { name: "admin" } });
    if (adminRole) {
      const adminUser = {
        username: "admin@system.dom",
        password: await bcrypt.hash("1234", 10),
        roleId: adminRole.id,
      };
      await User.create(adminUser);
    }

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding:", error);
  }
};

seedUsersRoles();
