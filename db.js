var mysql = require("mysql");

function bamazonDB() {

	var connection = mysql.createConnection({
	
		host: 'localhost',
		port: 3306,
		user: 'test_user',

		password: "12345678",
		database: 'bamazon',

	});

	this.initDB = function() {

		connection.connect(function(err, res){

			if (err) {

				return console.log(err);

			}

			console.log("Connecting to DB system...");
			//callback();

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
		    "select stock_quantity from products where item_id=?",
		    [idNumber],
		    function(err, res){

		    	if (err) {

		    		return console.log(err);

		    	}

		    	console.log(res[0]);

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
		    		callback(updatedQuantity);

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

	this.shutdown = function() {

		connection.end();

	}

}

//var db = new bamazonDB();

//db.checkQuantity(1,2,function(res){

//	db.removeItem(1, 21, function(res){});

//});



//db.checkQuantity(1,2,function(res){});


module.exports = bamazonDB;