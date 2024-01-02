const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");

router.get("/",verify, (req, res) => {
  res.json({
    posts: {
      title: "my first post ",
      descrition: "random data u shouldnt acess",
    },
  });
});

module.exports = router;
