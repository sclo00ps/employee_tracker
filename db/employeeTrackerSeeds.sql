-- Drops the employee_trackerDB  if it exists currently --
DROP DATABASE IF EXISTS employee_trackerDB;
-- Creates the "employee_trackerDB " database --
CREATE DATABASE employee_trackerDB;

-- Makes it so all of the following code will affect employee_trackerDB --
USE employee_trackerDB;

-- Creates the department, role and employe tables within employee_trackerDB --

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10,4),
  department_id INT,
  PRIMARY KEY (id)
);

  CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  -- Makes a string column called "first name" which cannot contain null --
  first_name VARCHAR(30) NOT NULL,
  -- Makes a string column called "last name" which cannot contain null --
  last_name VARCHAR(30) NOT NULL,
 -- Makes an numeric column called "role_id" --
  role_id INT, 
  -- Makes an numeric column called "manager_id" --
  manager_id INT,
  PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000.00, 1), ("Salesperson",80000.00, 1 ), ("Lead Engineer", 150000.00, 2),("Software Engineer", 120000.00, 2), ("Accountant", 125000.00, 3), ("Legal Team Lead", 250000.00,4), ("Lawyer", 190000.00,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carolyn", "Thorton" 1, 1), ("Roberto", "Garcia", 2, 1), ("Kevin", "Gracenette", 3, 2),("Beverly", "Jenkinson", 4, 2), ("Kellie", "Rashad", 5, 3), ("Mateos", "Sortingford", 4, 1), ("Sherrelle", "Harrington", 4, 2);

SELECT department_id
FROM department
INNER JOIN role on department.id = role.department_id;

SELECT role_id
FROM role
INNER JOIN employee on role.id = employee.role_id;

 