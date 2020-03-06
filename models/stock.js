module.exports = function(sequelize, DataTypes) {
  var Stock = sequelize.define("Stock", {
    stockName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stockSymbol: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  
  Stock.associate = function(models) {
    // We're saying that a Stock should belong to an Author
    // A Stock can't be created without an Author due to the foreign key constraint
    Stock.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Stock;
};