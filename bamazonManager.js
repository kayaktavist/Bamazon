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
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    view();
                    break;

                case "View Low Inventory":
                    lowStock();
                    break;

                case "Add to Inventory":
                    addStock();
                    break;

                case "Add New Product":
                    newProduct();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
};

function view() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        console.log("\n")
        console.table(res);
        console.log("\n")
    });
    menu();
};

function lowStock() {
    var query = "SELECT * FROM products WHERE stock_quantity < 20";
    connection.query(query, function (err, res) {
        console.log("\n")
        console.table(res);
        console.log("\n")
        menu();
    });
};

function addStock() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        console.log("\n")
        console.table(res);
        console.log("\n")
        inquirer
            .prompt([
                {
                    name: "item",
                    type: "list",
                    message: "What item would you like to update?",
                    choices: [
                        "Sticky Rice",
                        "Dried Pineapple",
                        "Cannery Row",
                        "Mountain Bike",
                        "70L Backpack",
                        "Canoe Paddle",
                        "USGS Mapset",
                        "Metric Wrenches",
                        "Socket Set",
                        "Nikon DSLR"
                    ]
                },
                {
                    type: "input",
                    name: "quantity",
                    message: "How many of this item would you like to add to inventory?"
                }
            ]).then(function (answer) {
                var query = "UPDATE products SET ? WHERE ? ";
                connection.query(query, [
                    {
                        stock_quantity: parseInt(res[0].stock_quantity) + parseInt(answer.quantity),
                    },
                    {
                        product_name: answer.item
                    },
                    
                ],function (err) {
                    if (err) throw err;
                    console.log("\n");
                    console.log("Your product was updated successfully!");
                    console.log("\n");
                    view();
                });
            });
    });
};

function newProduct() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What product would you like to add to inventory?"
            },
            {
                type: "input",
                name: "department",
                message: "In what department would you like to place the item?"
            },
            {
                type: "input",
                name: "price",
                message: "What is the retail item price per unit?"
            },
            {
                type: "input",
                name: "quantity",
                message: "How many of this item would you like to add to inventory?"
            }
        ]).then(function (answer) {
            var query = "INSERT INTO products SET ?";
            connection.query(query, [
                {
                    product_name: answer.name,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.quantity
                },      
            ], function (err) {
                if (err) throw err;
                console.log("\n")
                console.log("Your product was created successfully!");
                console.log("\n")
                view();
            }); 
        });
};