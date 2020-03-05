// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const axios = require("axios");
require("dotenv").config();

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        console.log(req.body.email);
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/stock", function(req, res){
    stocks(req, res);
  });

  app.post("/api/stock", function(req, res){
    stocks(req.body.data, res)
      .then(function(resolved) {
        res.send(resolved.data);
        // console.log(resolved.data.price.longName);
      });
  });

  app.post("/api/associateStock", function(req, res) {
    orm.insertOne(req.body.symbol, false, function(data) {
      console.log(data);
      res.redirect("/");
    });
  });

};

async function stocks(data){
  const response = await axios({
    "method":"GET",
    "url":"https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary",
    "headers":{
      "content-type":"application/json",
      "x-rapidapi-host":"apidojo-yahoo-finance-v1.p.rapidapi.com",
      "x-rapidapi-key":process.env.API_KEY,
    },"params":{
      "region":"US",
      "symbol": data
    }
  });
  
  return response;
  // .then((response)=>{
  // //   console.log(response.data.defaultKeyStatistics.lastSplitFactor);
  //   res.render("members", response.data.defaultKeyStatistics);
  // })
  // .catch((error)=>{
  //   console.log(error);
  // });
}



// app.delete("/stocks/:id", function(req, res) {
//   orm.deleteOne(req.params.id, function(data) {
//     console.log(data);
//     res.sendStatus(200);
//   });
// });
