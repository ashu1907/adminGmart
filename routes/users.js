var express = require('express');
var router = express.Router();
const { validationResult } = require("express-validator");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var userModel = require("../models/user");
var userController = require("../controllers/userController");
var userValidation = require("../validation/userValidation");
const bcrypt = require("bcrypt");


passport.serializeUser(function (user, done) {
  done(null, user.email);
});
passport.deserializeUser(function (email, done) {
  userModel.findOne(
    {
      email: email,
    },
    function (err, user) {
      done(err, user);
    }
  );
});


passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      var isValidPassword = function (userpass, password) {
        return bcrypt.compareSync(password, userpass);
      };
      userModel.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "No user found" });
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, { message: "Incorrect Password!" });
        }
        return done(null, user);
      });
    }
  )
);

//login page
router.get("/login", (req, res) => {
  res.render("login", {
    message: req.flash("info"),
    error: req.flash("error"),
  });
});
//register page
router.get('/register', function(req, res){
  res.render('register')
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "login",
    failureFlash: true,
  }),
  userController.login
);

module.exports = router;
