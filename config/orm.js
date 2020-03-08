const connection = require("./connection.js");

const orm = {

  insertOne: function(stock, cb) {
    var query = "INSERT INTO Stocks (stockName, stockSymbol,UserId) VALUES (?,?,?)";
    connection.query(query, [stock.stockName, stock.stockSymbol, stock.userId ], function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  deleteOne: function(UserId, symbol, cb) {
    var query = "DELETE FROM Stocks WHERE UserId = " + UserId + " and stockSymbol = '" + symbol + "'";
    console.log(query);
    connection.query(query, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }
};



module.exports = orm;
