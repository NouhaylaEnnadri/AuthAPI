const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const apiLimiter = require("./routes/rateLimiting");

dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.error("Error connecting to DB:", error));

//middleware
app.use("/api", apiLimiter); // Apply rate limiting to all routes under "/api"

app.use(express.json());
// Routes Middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.listen(3000, () => console.log("Listening on port 3000"));

//Byee
