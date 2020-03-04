const express = require("express");
const router = express.Router();
const orm = require("../config/orm");

router.get("/", function (req, res){
  orm.selectAll(function(data) {
    console.log(data);
    var object = {
      stocks: data
    };
    // console.log(err);
    res.render("index", object);
  });
});

router.post("/stocks/create", function(req, res) {
  orm.insertOne(req.body.name, false, function(data) {
    console.log(data);
    res.redirect("/");
  });
});

router.delete("/stocks/:id", function(req, res) {
  orm.deleteOne(req.params.id, function(data) {
    console.log(data);
    res.sendStatus(200);
  });
});

module.exports = router;
