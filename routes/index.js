const express = require("express");
const router = express.Router();

// Import routes
const authRoutes = require("./authRoutes");
const translationRoutes = require("./translationRoutes");
const checkAuth = require("../middleware/auth");
// Use routes
router.use("/auth", authRoutes);
router.use("/translate", checkAuth.authenticate, translationRoutes);

module.exports = router;
