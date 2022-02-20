DROP DATABASE IF EXISTS work;
CREATE DATABASE work;
USE work;

CREATE TABLE department (
    department_name VARCHAR(30) NOT NULL,
    id INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT
);

CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);
