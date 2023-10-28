const Course = require("../models/Course");
const Role = require("../models/Role");
const { User, SavedTranslation } = require("../models");
const tokensJsonJs = require("../utils/tokensJs.json");
const tokensJsonPseudo = require("../utils/tokensPseudo.json");
const jwt = require("jsonwebtoken");

const translationController = {
  translateJS: (req, res) => {
    const code = req.body.code;

    if (!code) {
      return res.sendStatus(403);
    }

    let newCode = code;
    for (let key of Object.keys(tokensJsonJs)) {
      const currentRegex = new RegExp(key, "g");
      newCode = newCode.replace(currentRegex, tokensJsonJs[key]);
    }

    res.send({ translatedCode: newCode });
  },

  translatePseudo: (req, res) => {
    const code = req.body.code;

    if (!code) {
      return res.sendStatus(403);
    }

    let newCode = code;
    for (let key of Object.keys(tokensJsonPseudo)) {
      const currentRegex = new RegExp(key, "g");
      newCode = newCode.replace(currentRegex, tokensJsonPseudo[key]);
    }

    res.send({ translatedCode: newCode });
  },

  saveCourse: async (req, res) => {
    try {
      const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      const { name, description, availableDate, official, translation } =
        req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { originalMessage, translationType } = translation;

      const savedTranslation = await SavedTranslation.create({
        originalMessage,
        translationType,
        userId: decoded.userId, // Assuming user data is stored in req.user
      });

      const course = await Course.create({
        name,
        description,
        availableDate,
        official,
        savedTranslationId: savedTranslation.id,
      });

      res.json({ message: "Course created successfully", course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  editCourse: async (req, res) => {
    const { courseId } = req.params;

    try {
      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      const { name, description, availableDate, official, translation } =
        req.body;
      const { originalMessage, translationType } = translation;

      let savedTranslation = await SavedTranslation.findOne({
        where: { id: course.savedTranslationId },
      });

      if (!savedTranslation) {
        savedTranslation = await SavedTranslation.create({
          originalMessage,
          translationType,
          userId: req.user.id, // Assuming user data is stored in req.user
        });
      } else {
        await savedTranslation.update({
          originalMessage,
          translationType,
        });
      }

      await course.update({
        name,
        description,
        availableDate,
        official,
        savedTranslationId: savedTranslation.id,
      });

      res.json({ message: "Course updated successfully", course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.findAll({
        include: [
          {
            model: SavedTranslation,
            attributes: ["originalMessage", "translationType", "timeLogs"],
          },
        ],
      });

      res.json({ courses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getOfficialCourses: async (req, res) => {
    try {
      const officialCourses = await Course.findAll({
        where: { official: true },
        include: [
          {
            model: SavedTranslation,
            attributes: ["originalMessage", "translationType", "timeLogs"],
          },
        ],
      });

      res.json({ officialCourses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getNonOfficialCourses: async (req, res) => {
    try {
      const user = await req.user; // Assuming user data is stored in req.user
      if (!user) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const nonOfficialCourses = await Course.findAll({
        where: { official: false },
        include: [
          {
            model: SavedTranslation,
            attributes: ["originalMessage", "translationType", "timeLogs"],
            where: { userId: user.id },
          },
        ],
      });

      res.json({ nonOfficialCourses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteCourse: async (req, res) => {
    const { courseId } = req.params;

    try {
      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      await course.destroy();

      res.json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  changeSubscriptionModel: async (req, res) => {
    const { newSubscriptionModel } = req.params; // Assuming the parameter comes from the URL

    try {
      const user = await User.findByPk(req.user.id); // Assuming you have user data in req.user

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const role = await Role.findByPk(newSubscriptionModel);

      if (!role) {
        return res.status(400).json({ error: "Invalid role_id" });
      }

      // Update the user's subscription model
      await user.update({ roleId: newSubscriptionModel });

      res.json({ message: "Subscription model changed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = translationController;
