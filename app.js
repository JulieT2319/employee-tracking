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
});