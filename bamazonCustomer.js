var inquirer = require('inquirer');
var mysql = require('mysql');

// Connection to the localhost
var connection = mysql.createConnection({

    host: 'localhost',
    
	port: 3306,

	user: 'root',

    password: '',
    
    database: 'bamazon'
});

// Display items currently in stock
function displayInventory() {

	queryStr = 'SELECT * FROM products';

	connection.query(queryStr, function(err, data) {

		if (err) throw err;

        console.log('\nCurrent Inventory: \n');

        var output = '';
        
		for (var i = 0; i < data.length; i++) {

			output = '';
			output += 'Item ID: ' + data[i].item_id + '  /  ';
			output += 'Product Name: ' + data[i].product_name + '  /  ';
			output += 'Department: ' + data[i].department_name + '  /  ';
			output += 'Price: $' + data[i].price + '\n';

			console.log(output);
		}

	  	promptUserPurchase();
	})
}

function promptUserPurchase() {

	// Asks the user what to buy and the amount
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: numberCheck,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: numberCheck,
			filter: Number
        }
        
	]).then(function(input) {

        // Link the answers to usable variables

        var item = input.item_id;
        
		var quantity = input.quantity;

		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {

                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                
				displayInventory();

			} else {

				var productData = data[0];

				// If the item is in stock
				if (quantity <= productData.stock_quantity) {

					console.log('\nPlacing order...');

					// Construct the updating query string
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					// Update the inventory
					connection.query(updateQueryStr, function(err, data) {

						if (err) throw err;

						console.log('\nYour order has been placed. Your total is $' + productData.price * quantity + "\n");

						// End the database connection
						connection.end();
                    })
                    
				} else {

                    console.log('\nSorry, there is not enough product in stock.');
                    
					console.log('\nPlease submit a different order. \n');

					displayInventory();
				}
			}
		})
	})
}

// Check for whole numbers
function numberCheck(value) {

    var integer = Number.isInteger(parseFloat(value));
    
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {

        return true;
        
	} else {

		return 'Please enter a whole number.';
	}
}

displayInventory();