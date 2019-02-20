var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    menu();
});

function menu() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "product",
                message: "*** Main Menu ***\n\nWhat would you like to purchase today?"
            },
            {
                type: "input",
                name: "quantity",
                message: "How many of this item would you like to purchase?"
            }
        ])
        .then(function (answer) {
            var query = "SELECT price, stock_quantity FROM products WHERE ?";
            connection.query(query, { product_name: answer.product }, function (err, res) {
                // console.log(res[0].price);
                // console.log(res[0].stock_quantity);

                if (res[0].stock_quantity < answer.quantity) {
                    console.log("We're sorry, there are only " + res[0].stock_quantity + " of this item left in stock. \n\nWe'll return you to the main catalogue menu. \n\n ============================ \n");
                    console.log()
                    menu();
                }
                else {
                    var query = "UPDATE products SET ? WHERE ? ";
                    connection.query(query, [
                        {
                            stock_quantity: res[0].stock_quantity - answer.quantity,
                        },
                        {
                            product_name: answer.product
                        }
                    ], function (err, res) {
                        var query = "SELECT  product_name, price, stock_quantity FROM products WHERE ?";
                        connection.query(query, { product_name: answer.product }, function (err, res) {
                            // console.log(res[0].price);
                            // console.log(res[0].stock_quantity);
                            console.log("\n Thank you! You total is $" + res[0].price * answer.quantity + "\n \n ======================\n \n")

                            menu();

                        });
                    });
                };
            });
        });
};