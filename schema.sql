DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id  INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INTEGER(8) NOT NULL,
  stock_quantity INTEGER(8) NOT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Sticky Rice', 'Food', '4', '150');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Dried Pineapple', 'Food', '5', '60');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Cannery Row', 'Books', '10', '40');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Mountain Bike', 'Outdoor', '2000', '8');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('70L Backpack', 'Outdoor', '120', '25');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Canoe Paddle', 'Outdoor', '150', '5');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('USGS Mapset', 'Books', '80', '18');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Metric Wrenches', 'Tools', '35', '118');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Socket Set', 'Tools', '55', '180');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Nikon DSLR', 'Electronics', '2500', '75');


SELECT * FROM products;
