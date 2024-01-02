const jwt = require("jsonwebtoken");

module.exports = function authVerifier(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .send("Who are you? Your access is denied, stranger.");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("You have been caught trying to session hijack me.");
  }
};
