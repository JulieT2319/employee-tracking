class Employee {
	constructor(fname, lname, role, manager) {
		this.first_name = fname;
		this.last_name = lname;
		this.role_id = parseInt(role);
		this.manager_id = parseInt(manager);
	}
}

module.exports = Employee;
