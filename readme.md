Prerequisite for this project - MySQL

Create database - employee_crud
Create table Employee with following fields emp_no, first_name, last_name.

Command for the same is 

CREATE TABLE employee (
emp_no INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL
)
