USE company_db;
insert into department
	(name)
values("Corporate Offices"),
	("Sales"),
	("Customer Support"),
	("Human Resources");

insert into role
	(title, salary, department_id)
values("CEO", 100000, 1),
	("Sales", 45000, 2),
	("Call center agent", 34000, 3),
	("Call center Supervisor", 38000, 3);

insert into employee
	(first_name, last_name, role_id, manager_id)
values("John", "Schmidt", 1, null),
	("Julie", "Jones", 4, 1),
	("Clarrissa", "Jacobs", 3, 2),
	("Bob", "Marley", 3, 2);
