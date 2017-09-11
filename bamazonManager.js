var inquirer = require("inquirer");
var db = require("./db.js");

var myDB = new db();

myDB.initDB(initManagerSystem);

function output(arr) {

	for (var i = 0; i < arr.length; i++) {

		var item = arr[i];

		console.log("id:"+item.item_id, "name:"+item.product_name, "price:$"+item.price, "stock:"+item.stock_quantity );

	};

}

function initManagerSystem(){

	//myDB.initDB();

	inquirer.prompt([

	    {
	    	type: 'list',
	    	name: 'selection',
	    	choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'QUIT'],
	    	message: 'Make your selection:',
	    },

	]).then(function(answers){

		switch(answers.selection) {

			case "View Products for Sale":
				//myDB.initDB();
				myDB.readAll(function(res){

					console.log("\n"+"Here are the current Inventory:");

					output(res);

					console.log("--------------------------");

					//myDB.shutdown();
					initManagerSystem();

				});
			break;

			case "View Low Inventory":
				var low = 5;

				//console.log("in low Invetory path");
				//myDB.initDB();
				myDB.lowInventory(low, function(res){

					//console.log(res);

					console.log("\n"+"Here are the list of LOW Inventory items:");

					output(res);

					console.log("--------------------------");

					//myDB.shutdown();
					initManagerSystem();

				});
			break;

			case "Add to Inventory":
				//var low = 5;

				//console.log("in low Invetory path");
				//myDB.initDB();

				myDB.readAll(function(res){

					console.log("\n"+"Here are the current Inventory:");

					output(res);

					console.log("--------------------------");

					addMore(myDB.updateQuantity, 
					        function(){
					        	
					        	return myDB.readAll(function(res){

									console.log("\n"+"Here are the updated Inventory:");

									output(res);

									console.log("--------------------------");

									initManagerSystem();

								})
					});
					//initManagerSystem();

				});
			break;

			case "Add New Product":
				
				myDB.readAll(function(res){

					console.log("\n"+"Here are the current Inventory:");

					output(res);

					console.log("--------------------------");

					//addNewItem();
					
					addNewItem(myDB.addItem, 
					        function(){
					        	
					        	return myDB.readAll(function(res){

									console.log("\n"+"Here are the updated Inventory:");

									output(res);

									console.log("--------------------------");

									initManagerSystem();

								})
					});
					//initManagerSystem();
	
				});
			break;

			case "QUIT":
				myDB.shutdown();
				console.log("Thank you for using this system. Goodbye!");
			break;

			default:
				console.log("User should never see this case...");
				initManagerSystem();

		}



	});



}

function addMore(callback1, callback2){

	inquirer.prompt([

	    {
	    	type: 'input',
	    	name: 'itemId',
	    	message: 'What is the id of the item you would like to dd more of?',
	    },
	    {
	    	type: 'input',
	    	name: 'itemQuantity',
	    	message: 'How many more of this item would you ike to add?',
	    },

	]).then(function(answers){

		console.log(answers);
		callback1(answers.itemId, answers.itemQuantity, callback2);

	})

}

function addNewItem(callback1, callback2){

	inquirer.prompt([

	    {
	    	type: 'input',
	    	name: 'itemName',
	    	message: 'What is the name of the item you want to add?',
	    },
	    {
	    	type: 'input',
	    	name: 'department',
	    	message: 'Which department does the item belong to?',
	    },
	    {
	    	type: 'input',
	    	name: 'price',
	    	message: 'How much is the item selling for?',
	    },
	    {
	    	type: 'input',
	    	name: 'quantity',
	    	message: 'How many of this item is in inventory?',
	    },

	]).then(function(answers){

		//console.log(parseFloat(answers.price));
		callback1(answers.itemName, answers.department, parseFloat(answers.price), parseInt(answers.quantity), callback2);

	})


}

//initManagerSystem();