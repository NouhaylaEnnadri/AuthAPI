const rateLimit = require("express-rate-limit");

// Rate limiting middleware
module.exports = apiLimiter = rateLimit({
  windowMs: 1000,
  max: 2,
  message: "Too many requests from this IP, theden xwiya.",
});
