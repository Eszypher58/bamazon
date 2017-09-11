var mysql = require("mysql");

function bamazonDB() {

	var connection = mysql.createConnection({
	
		host: 'localhost',
		port: 3306,
		user: 'test_user',

		password: "12345678",
		database: 'bamazon',

	});

	this.initDB = function(callback) {

		connection.connect(function(err, res){

			if (err) {

				return console.log(err);

			}

			console.log("Connecting to DB system...");
			callback();

		})

	}

	this.readAll = function(callback) {

		//connectDB();

		connection.query("select * from products",
	    function(err, res){

	    	if (err) {

	    		console.log(err);

	    	}

	    	//connection.end();
	    	callback(res);
	    	/*
	    	connection.end(function(){

	    		console.log("closing connection...");

	    	});
	    	*/
	   		 //return res;

	    })

	}

	this.checkQuantity = function(idNumber, quantity, callback) {

		//connectDB();

		connection.query(
		    "select stock_quantity, price from products where item_id=?",
		    [idNumber],
		    function(err, res){

		    	if (err) {

		    		return console.log(err);

		    	}

		    	//console.log(res);

		    	if (res[0].stock_quantity < quantity) {

		    		//console.log("insufficent quantity!");
		    		//connection.end(function(){return callback(false)});
		    		//callback(false);
		    		
		    		//callback();
		    		//connection.end();
		    		callback(false);

		    	} else {

		    		var updatedQuantity = res[0].stock_quantity - quantity;
		    		//console.log(typeof quantity);
		    		//console.log(typeof res[0].stock_quantity);
		    		//console.log(updatedQuantity);
		    		//connection.end(function(){return 
		    		//callback(updatedQuantity);
		    		//});
		    		//connection.end();
		    		var arr = [updatedQuantity, res[0].price];

		    		callback(arr);

		    	}

		    	//callback(res);
		    	//connection.end();
		
		})


	}

	this.removeItem = function(idNumber, quantityToBeUpdated, callback) {

		//connectDB();

		connection.query(
		    "update products set stock_quantity=? where item_id=?",
		    [quantityToBeUpdated, idNumber],
		    function(err, res){

		    	if (err) {

		    		return console.log(err);

		    	}

				//console.log("would you like to make another purchase?");

				callback();

		    });

	}

	this.updateQuantity = function(idNumber, quantity, callback){

		//console.log("in add item");

		connection.query(
		    "update products set stock_quantity=stock_quantity+? where item_id=?",
		    [quantity, idNumber],
		    function(err, res){

		    	if (err) {

		    		return console.log(err);

		    	}

				console.log("Added " + quantity + " more of " + "item " + idNumber + " to Inventory!");

				callback();

		    });


	}

	this.lowInventory = function(stock, callback) {

		connection.query(
		    "select * from products where stock_quantity<=?",
		    [stock],
		    function(err, res){

		    	if (err) {

		    		return console.log(err);

		    	}

		    	//console.log(res);
				callback(res);

		    });


	}

	this.addItem = function(name, department, price, quantity, callback){

		connection.query("insert into products set product_name=?, department_name=?, price=?, stock_quantity=?",
		                 [name, department, price, quantity],
		                 function(err, res){

		                 	if(err) {

		                 		console.log(err);

		                 	}

		                 	console.log("added new item");

		                 	callback();

		                 });


	}

	this.shutdown = function() {

		connection.end();

	}

}

//var db = new bamazonDB();

//db.addItem("guitar", "music", 199.99, 3);

//db.addItem(1, 5);

//db.lowInventory(5);

//db.checkQuantity(1,2,function(res){

//	db.removeItem(1, 21, function(res){});

//});



//db.checkQuantity(1,2,function(res){});


module.exports = bamazonDB;