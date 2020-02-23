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
		message: "What do you want to do?",
		choices: ["View table", "Add information", "Update employee", "None of these"],
		type: "list"
	}).then(function (choice) {
		if (choice.addOrShow === "View table") {
			view();
		} else if (choice.addOrShow === "Add information") {
			add();
		} else if (choice.addOrShow === "Update employee") {
			update();
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
		query = "SELECT * FROM ??";
		if (choice.view === "Departments") {
			connection.query(query, ['department'], function (err, res) {
				console.log(res);
				console.log("---Company Departments---");
				console.table(res)
				start();
			})

		} else if (choice.view === "Roles") {
			connection.query(query, ['role'], function (err, res) {
				console.log("---Company Roles---");
				console.table(res)
				start();
			});
		} else if (choice.view === "Employees") {
			connection.query(query, ['employee'], function (err, res) {
				console.log("---Company Employees---");
				console.table(res)
				start();
			});
		}

	});
}

function add() {
	inq.prompt({
		name: "add",
		message: "What do you want to add?",
		choices: ["Department", "Role", "Employee"],
		type: "list"
	}).then(function (choice) {
		query = "SELECT * FROM ??";
		if (choice.add === "Department") {
			inq.prompt([{
				name: "dept",
				message: "What is the new department?",
				type: "input"
			}]).then(function (data) {
				connection.query("INSERT INTO ?? (??) VALUES (?);", ['department', 'name', data.dept]);
				start();
			});

		} else if (choice.view === "Role") {

		} else if (choice.view === "Employees") {

		}

	});
}