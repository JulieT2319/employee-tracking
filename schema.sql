DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department(
id INT PRIMARY KEY auto_increment NOT NULL,
name VARCHAR
(30) NOT NULL);

CREATE TABLE role(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
title varchar
(30) NOT NULL,
salary dec
(10,2) NOT NULL,
department_id INT not null,
 foreign key
(department_id) references department
(id));

CREATE TABLE employee(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
first_name varchar
(30) NOT NULL,
last_name varchar
(30) NOT NULL,
role_id int not null,
manager_id INT ,
foreign key
(role_id) references role
(id),
foreign key
(manager_id) references employee
(id));