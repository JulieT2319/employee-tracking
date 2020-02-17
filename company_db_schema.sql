DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department(
id INT PRIMARY KEY auto_increment NOT NULL,
name VARCHAR(30) NOT NULL);

CREATE TABLE role(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
title varchar(30) NOT NULL,
salary dec(10,2) NOT NULL,
department_id INT not null,
 foreign key (department_id) references department(id));
 
 CREATE TABLE employee(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
first_name varchar(30) NOT NULL,
last_name varchar(30) NOT NULL,
role_id int not null,
manager_id INT ,
foreign key (role_id) references role(id),
foreign key (manager_id) references employee(id));

insert into department (name)
	values("Corporate Offices"), ("Sales"), ("Customer Support"), ("Human Resources");
    
insert into role (title, salary, department_id)
	values("CEO", 100000,1), ("Sales",45000, 2), ("Call center agent", 34000, 3), ("Call center Supervisor", 38000, 3);

insert into employee (first_name, last_name, role_id, manager_id)
	values("John","Schmidt",1,null), ("Julie","Jones", 4, 1), ("Clarrissa","Jacobs", 3, 2), ("Bob","Marley", 3, 2);
