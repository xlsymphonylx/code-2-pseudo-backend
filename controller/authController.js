const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAuthToken = (userId, roleId) => {
  return jwt.sign({ userId, roleId }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
};

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const role = await Role.findOne({ where: { name: "free_client" } });
      if (!role) {
        return res.status(400).json({ error: "Invalid role" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        password: hashedPassword,
        roleId: role.id,
      });

      const token = generateAuthToken(user.id, role.id);

      res.json({ token, user: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({
        where: { username },
        include: [{ model: Role, attributes: ["name"] }],
      });

      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const token = generateAuthToken(user.id, user.Role.id);

      res.json({ token, user: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = authController;
