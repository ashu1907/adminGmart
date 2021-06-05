const { check } = require("express-validator");
var userModel = require("../models/user");


exports.loginvalidation = [
  check("email").not().isEmpty().trim().escape().withMessage("Email Required!"),
  check("password").not().isEmpty().trim().escape().withMessage("password Required!"),
];
