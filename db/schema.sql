CREATE DATABASE stocks_db;

USE stocks_db;


CREATE TABLE stock
(
    id INT NOT NULL AUTO_INCREMENT,
    stockName VARCHAR(255) NOT NULL,
    stockSymbol VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- CREATE TABLE userHasStock 
-- (
-- userID INT NOT NULL,
-- stockID INT NOT NULL,
-- FOREIGN KEY (userID) REFERENCES user(id),
-- FOREIGN KEY (stockID) REFERENCES stock (id)
-- );