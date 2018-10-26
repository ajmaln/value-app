var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var UserThing = require("../models/userThing.js");
var middleware = require("./middleware.js");
var moment = require("moment");

// All routes are on /myaccount root

// Show User Profile
router.get("/", middleware.isLoggedIn, function(req, res) {
  res.render("user/myaccount");
});

// Update User Profile
router.put("/", middleware.isLoggedIn, function(req, res) {
  User.findOneAndUpdate({username: req.user.username}, req.body.user, function(err, updatedUser) {
    if (err) {
      console.log(err);
      req.flash("error", "Something went wrong!");
      res.redirect("/myaccount");
    } else {
      req.flash("success", "Profile updated!");
      res.redirect("/myaccount");
    }
  });
});

module.exports = router;
