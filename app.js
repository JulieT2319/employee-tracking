const inquirer = require("inquirer");
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
	inquirer.prompt({
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
	inquirer.prompt({
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
	inquirer.prompt({
		name: "add",
		message: "What do you want to add?",
		choices: ["Department", "Role", "Employee"],
		type: "list"
	}).then(function (choice) {
		if (choice.add === "Department") {
			inquirer.prompt([{
				name: "dept",
				message: "What is the new department?",
				type: "input"
			}]).then(function (data) {
				connection.query("INSERT INTO ?? (??) VALUES (?);", ['department', 'name', data.dept], function (err) {
					if (err) throw err;
					console.log("Your department was created successfully!");
					start();
				});
			});

		} else if (choice.add === "Role") {
			connection.query("SELECT * FROM department", function (err, results) {
				if (err) throw err;
				inquirer
					.prompt([
						{
							name: "title",
							type: "input",
							message: "What is the new role's title?"
						},
						{
							name: "salary",
							type: "input",
							message: "How much is this role's salary?",
							validate: function (value) {
								if (isNaN(value)) {
									return "Please enter a salary amount";
								} else {
									return true
								}
							}
						},
						{
							name: "choice",
							type: "rawlist",
							choices: function () {
								var choiceArray = [];
								for (var i = 0; i < results.length; i++) {
									choiceArray.push(results[i].name);
								}
								return choiceArray;
							}
						}

					])
					.then(function (answer) {
						// get the information of the chosen department
						var chosenDept;
						for (var i = 0; i < results.length; i++) {
							if (results[i].name === answer.choice) {
								chosenDept = results[i];
							}
						}
						connection.query(
							"INSERT INTO role SET ?",
							{
								title: answer.title,
								salary: answer.salary,
								department_id: chosenDept.id
							},
							function (err) {
								if (err) throw err;
								console.log("Your role was created successfully!");
								start();
							}
						);
					});
			});
		} else if (choice.add === "Employee") {
			connection.query("SELECT * FROM role", function (err, results) {
				if (err) throw err;
				inquirer
					.prompt([
						{
							name: "fname",
							type: "input",
							message: "What is the new employee's first name?"
						},
						{
							name: "lname",
							type: "input",
							message: "What is the new employee's last name?"
						},
						{
							name: "title",
							type: "rawlist",
							choices: function () {
								var choiceArray = [];
								for (var i = 0; i < results.length; i++) {
									choiceArray.push(results[i].title);
								}
								return choiceArray;
							}
						}
					])
					.then(function (answer) {
						// get the information of the chosen title
						var chosenRole;
						for (var i = 0; i < results.length; i++) {
							if (results[i].title === answer.title) {
								chosenRole = results[i];
							}
						}
						connection.query("SELECT * FROM employee", function (err, emp) {
							if (err) throw err;
							inquirer
								.prompt([
									{
										name: "manager",
										type: "rawlist",
										choices: function () {
											var choiceArray = [];
											for (var i = 0; i < emp.length; i++) {
												choiceArray.push(emp[i].first_name + " " + emp[i].last_name);
											}
											choiceArray.push("No manager");
											return choiceArray;
										}
									}
								]).then(function (answer2) {
									// get the information of the chosen department
									var chosenManager = { id: null };
									for (var i = 0; i < emp.length; i++) {
										var managerName = emp[i].first_name + " " + emp[i].last_name;
										if (managerName === answer2.manager) {
											chosenManager = emp[i];
										}
									} connection.query(
										"INSERT INTO employee SET ?",
										{
											first_name: answer.fname,
											last_name: answer.lname,
											role_id: chosenRole.id,
											manager_id: chosenManager.id
										},
										function (err) {
											if (err) throw err;
											console.log("Your employee was created successfully!");
											start();
										});
								});
						});
					});
			});
		}
	});
};
