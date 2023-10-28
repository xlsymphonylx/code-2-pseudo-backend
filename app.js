const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
// Load environment variables from .env file
dotenv.config();

const app = express();
const sequelize = require("./config/database");
const models = require("./models");

// Sync models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// Set up CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Import routes
const routes = require('./routes');

// Use routes
app.use('/', routes); // Assuming you want your API routes under /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
