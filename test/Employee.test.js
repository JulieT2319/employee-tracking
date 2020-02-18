const Employee = require("../lib/Employee");

test("Can instantiate Employee instance", () => {
	const e = new Employee();
	expect(typeof e).toBe("object");
});

test("Can set first name via constructor arguments", () => {
	const fname = "Alice";
	const e = new Employee(fname);
	expect(e.first_name).toBe(fname);
});

test("Can set Last name via constructor arguments", () => {
	const lname = "James";
	const e = new Employee("Alice", lname);
	expect(e.last_name).toBe(lname);
});

test("Can set role via constructor argument", () => {
	const testValue = 3;
	const e = new Employee("Alice", "James", testValue);
	expect(e.role_id).toBe(testValue);
});

test("Can set manager via constructor argument", () => {
	const testValue = 2;
	const e = new Employee("Alice", "James", 3, testValue);
	expect(e.manager_id).toBe(testValue);
});
