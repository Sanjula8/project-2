// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
// const orm = require("../config/orm");
const axios = require("axios");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
    function stocks(){
      axios({
        "method":"GET",
        "url":"https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary",
        "headers":{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key":"fc5f9a45b1mshee0ed2db4af132cp10d4e9jsn16a42c447127",
        },"params":{
          "region":"US",
          "symbol":"AMRN"
        }
      })
        .then((data)=>{
          console.log(data);
        })
        .catch((error)=>{
          console.log(error);
        });
    }
    stocks();
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
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
