DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fake Cat Food", "Essentials", 3.50, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Real Cat Food", "Essentials", 6.20, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Energizer Bunny Plushie", "Appliances", 6.50, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chocolate-covered Raisins", "Heresy", 4.60, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Redbull", "Flight Equipment", 5.00, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "Electronics", 100000.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tide Pods", "Food", 12.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mittens", "Clothing", 5.50, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beanie Babies", "Collectables", 10.70, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mighty Putty", "Children's Toys", 30, 750);