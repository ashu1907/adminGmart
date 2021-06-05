const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var session = require("express-session");

function login(req, res) {
    
      res.redirect("login");
  
    }
  

function logout(req, res) {
    req.logout();
    res.redirect("login");
  }

  module.export ={
      logout,
      login,
  };