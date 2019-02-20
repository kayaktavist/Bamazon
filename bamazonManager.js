// Create a new Node application called `bamazonManager.js`. Running this application will:

//   * List a set of menu options:

//     * View Products for Sale

//     * View Low Inventory

//     * Add to Inventory

//     * Add New Product

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

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
        console.table(res);
       
    });

};

function lowStock() {
    var query = "SELECT * FROM products WHERE stock_quantity < 20";
    connection.query(query, function (err, res) {
        console.table(res);
        menu();
    });
};

function addStock() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        view();
        console.table(res);
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
                    }
                ]);
                view();
                menu();
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
                function (err) {
                    if (err) throw err;
                    console.log("Your product was created successfully!");
                }
            ]);
            view();
            menu();
        });
};