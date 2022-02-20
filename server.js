const inquirer = require('inquirer');
const { mainModule } = require('process');
const connection = require('./connect-mysql/connect') 



const promptUser = () => {
inquirer.prompt([
        {
            type: 'list',
            message: 'choose an option',
            name: 'options',
            choices: ['view all departments', 
                      'view all roles', 
                      'view all employees', 
                      'add a department', 
                      'add a role', 
                      'add an employee', 
                      'update an employee role']
        }
    ])

    .then((userChoice) => {
        const {choices} = userChoice;

        if(choices === 'view all departments') {
            viewAllDepartments();
        }

        if(userChoice === 'view all roles') {
            viewRoles();
        }

        if(userChoice === 'view all employees') {
            viewEmployees();
        }

        if(userChoice === 'add a department') {
            addDepartment();
        }

        if(userChoice === 'add a role') {
            addRole();
        }

        if(userChoice === 'add an employee') {
            addEmployee();
        }

        if(userChoice === 'update an employee role') {
            updateRole();
        }

    });

};

function viewAllDepartments() {
    const sql =   `SELECT department.id AS id, department.department_name AS department FROM department`; 
    connection.promise().query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
        promptUser();
    });
}

function viewRoles() {
    const sql =     `SELECT role.id, role.title, department.department_name AS department
                  FROM role
                  INNER JOIN department ON role.department_id = department.id`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
      response.forEach((role) => {console.log(role.title);
    });
    promptUser();
});
}



promptUser();