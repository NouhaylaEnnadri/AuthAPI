const rateLimit = require("express-rate-limit");

// Rate limiting middleware
module.exports = apiLimiter = rateLimit({
  windowMs: 1000, // 15 minutes
  max: 1, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
