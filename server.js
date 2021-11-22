const inquirer = require('inquirer')
const connect = require('./connect-mysql/connect')



const Main = () => {
inquirer
    .prompt([
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

        if(userChoice === 'view all departments') {
            viewDepartments();
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

function viewDepartments() {

}