const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  // Let's validate the data before we create a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user is already in the database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user based on the validated data
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    pwd: hashPassword,
  });

  try {
    // Save the user to the database
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    // Handle database save error
    res.status(500).send(err);
  }
});

//login
router.post("/login", async (req, res) => {
  // Let's validate the data before we create a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user is already in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("u don't belong here");

  //check the password
  const validpwd = await bcrypt.compare(req.body.password, user.pwd);
  if (!validpwd)
    return res.status(400).send("u can't even remeber your password");

  //create and assign a token

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.TOKEN_SECRET
  );

  res.header("aut-token", token).send("u made it yahoo \n" + token);
});

module.exports = router;
