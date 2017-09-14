var inquirer = require("inquirer");
var db = require("./db.js");
var table = require("table");
var myDB = new db();

myDB.initDB(initSupervisorSysmte);

function initSupervisorSysmte(){

	inquirer.prompt([

	    {
	    	type: 'list',
	    	name: 'selection',
	    	choices: ['View Products Sales by Department', 'Create New Department', 'QUIT'],
	    	message: 'Make your selection:',
	    },

	]).then(function(answers){

		console.log(answers);


	})



}