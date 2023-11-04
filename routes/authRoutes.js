const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// Route for user registration
router.post("/register", upload.single("profile_img"), authController.register);

// Route for user login
router.post("/login", authController.login);

module.exports = router;
