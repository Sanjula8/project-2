const connection = require("./connection.js");

const orm = {
  // Select All
//   selectAll: function(cb) {
//     var query = "SELECT * from userHasStock";
//     connection.query(query, function(err, res){
//       if (err) {
//         throw err;
//       }
//       cb (res);
//     });
//   },
  // Insert One Stock into User's Stock Table - Adds ID
  insertOne: function(stock, cb) {
    var query = "INSERT INTO Stocks (stockName, stockSymbol,UserId) VALUES (?,?,?)";
    connection.query(query, [stock.stockName, stock.stockSymbol, stock.userId ], function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }

  // Deletes from User's Stock, where STOCKID is equal to ID being targeted
//   deleteOne: function(cb){
//     var query = "DELETE FROM userHasStock WHERE stockID = " + id;
//     connection.query(query, function(err, res) {
//       if (err) {
//         throw err;
//       }
//       cb(res);
//     });
//   }
};



module.exports = orm;
