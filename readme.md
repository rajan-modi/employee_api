Node.js CRUD Demo for Employee API

Prerequisite for this project - MySQL

Create database - employee_crud.

Create table Employee with following fields emp_no, first_name, last_name.

Command for the same is 

CREATE TABLE employee (
emp_no INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL
)


Endpoint descriptions

get, put, post and delete request can be performed on the endpoints

1. /employees/:page_no - get request returns list of employees with 10 records per page. 
2. /employee/:id - get request returns individual employee detail with emp_no provided in the param.
3) /employee - post request creates new employee.
4) /employee/:id - delete request deletes the employee with emp_no provided in the param.
5) /employee/:id - put request updates the employee data.

Project Setup 

1. npm install
2. npm install -g nodemon
3. nodemon

After app starts check it locally at http://localhost:3000/employees/1
