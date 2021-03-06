// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
// const orm = require("../config/orm");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
 
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {

    db.Stock.findAll({
      where: {
        UserID : req.user.id
      }
    }).then(function(data) {
      const object = {
        response: data
      };
      console.log(data[0]);
      res.render("members", object);
    });
    
  });


};