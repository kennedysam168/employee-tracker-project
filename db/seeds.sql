-- USE work;
INSERT INTO department(department_name) 
VALUES("Sales"), ("Engineer"), ("Accounting"), ("Corporate");

INSERT INTO roles(title, salary, department_id) 
VALUES ("Engineer", 85000, 1), ("Receptionist", 40000, 2), ("Manager", 100000, 3), ("CEO", 300000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) 
VALUES ("John", "Doe", 1, 3), ("Jane", "Doe", 2, 3), ("Sam", "Kennedy", 4, 3);