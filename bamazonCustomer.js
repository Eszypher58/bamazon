var inquirer = require("inquirer");
var db = require("./db.js");

var myDB = new db();

myDB.initDB();

function startSystem() {

	myDB.readAll(function (res) {

		console.log("\n"+"Here are the items for purchase:");

		for (var i = 0; i < res.length; i++) {

			var item = res[i];

			console.log("id:"+item.item_id, item.product_name, "$"+item.price, item.stock_quantity );

		};

		console.log("--------------------------");

		//callback();
		purchasePrompt();

	});

}

//listAllItems(purchasePrompt);

function purchasePrompt(){
	
	inquirer.prompt([

	    {
	    	type: 'input',
	    	name: 'purchaseId',
	    	message: 'What is the id of the item you would like to purchase?',
	    },
	    {
	    	type: 'input',
	    	name: 'purchaseQuantity',
	    	message: 'How many of this item would you like to purchase?',
	    },

	]).then(function(answers) {

		console.log("processing...");
		//console.log(answers.purchaseId);
		//console.log(answers.purchaseQuantity);
		var purchaseId = answers.purchaseId;
		var purchaseQuantity = answers.purchaseQuantity;

		myDB.checkQuantity(purchaseId, purchaseQuantity, function(res){

			if (res === false) {

				console.log("insufficent quantity in stock!");
				setTimeout(function() {purchaseAgain()}, 500);
				
			} else {

				myDB.removeItem(purchaseId, res, function(){

				console.log("Thank you for your purchase!");
				setTimeout(function() {purchaseAgain()}, 500);


				});
			}

		})


	});


}

function purchaseAgain() {

	inquirer.prompt([

		    {
		    	type: 'confirm',
		    	name: 'purchaseAgain',
		    	default: true,
		    	message: 'Would you like to make another purchase?',
		    },

		]).then(function(answers){

			//console.log(answers.purchaseAgain);
			if (answers.purchaseAgain) {

				startSystem();

			} else {

				myDB.shutdown();
				return console.log("Thank you and goodbye!");

			}

		})


}

startSystem();
//var response;






//console.log(response);
