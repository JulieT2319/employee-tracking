const inq = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();
var connection = mysql.createConnection({
	host: "localhost",

	// Your port; if not 3306
	port: process.env.SQL_PORT,

	// Your username
	user: process.env.SQL_USER,

	// Your password
	password: process.env.SQL_PASSWORD,
	database: process.env.SQL_DB
});

// connect to the mysql server and sql database
connection.connect(function (err) {
	if (err) throw err;
	console.log(process.env.SQL_PASSWORD + "\n" + process.env.SQL_DB);
	start();
});

function start() {
	inq.prompt({
		name: "addOrShow",
		message: "Do you want view the database or add to the database?",
		choices: ["View", "Add", "Neither"],
		type: "list"
	}).then(function (choice) {
		if (choice.addOrShow === "View") {
			view();
		} else if (choice.addOrShow === "Add") {
			add();
		} else {
			connection.end();
		}
	});
}
function view() {
	inq.prompt({
		name: "view",
		message: "What do you want to view?",
		choices: ["Departments", "Roles", "Employees"],
		type: "list"
	}).then(function (choice) {
		query = "SELECT * FROM ?";
		if (choice.view === "Departments") {
			connection.query("SELECT * FROM department", function (err, res) {
				console.log(res);
				for (var i = 0; i < res.length; i++) {
					console.log(
						"Department " +
						res[i].id +
						". " +
						res[i].name
					);
				};
			});
		} else if (choice.view === "Roles") {

		} else if (choice.view === "Employees") {

		}
		start();
	});
}
