const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Make sure to import your User model

exports.authenticate = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findOne({ where: { id: decoded.userId } });
    if (!user) {
      return res.status(401).json({ message: "Token Invalido" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token", error);
    res.status(500).json({ message: "Error interno de servidor" });
  }
};
