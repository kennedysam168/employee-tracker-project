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
        const {options} = userChoice;

        if(options === 'view all departments') {
            viewAllDepartments();
        }

        if(options === 'view all roles') {
            viewAllRoles();
        }

        if(options === 'view all employees') {
            viewAllEmployees();
        }

        if(options === 'add a department') {
            addDepartment();
        }

        if(options === 'add a role') {
            addRole();
        }

        if(options === 'add an employee') {
            addEmployee();
        }

        if(options === 'update an employee role') {
            updateRole();
        }

    });

};


function viewAllDepartments() {
    const sql =   `SELECT * FROM department`; 
    connection.query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
        promptUser();
    });
}

function viewAllRoles() {
    const sql =  `SELECT * FROM roles`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
      response.forEach((role) => {console.log(role.title);
    });
    promptUser();
});
}

const viewAllEmployees = () => {
    let sql =  `SELECT * FROM employee`;
    connection.query(sql, (error, response) => {
      if (error) throw error;
      console.table(response);
      promptUser();
    })
}





const addEmployee = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'fistName',
        message: "What is the employee's first name?",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
      }
    ])
      .then(answer => {
      const crit = [answer.fistName, answer.lastName]
      const rolesSql = `SELECT roles.id, roles.title FROM roles`;
      connection.query(rolesSql, (error, data) => {
        if (error) throw error; 
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        inquirer.prompt([
              {
                type: 'list',
                name: 'roles',
                message: "What is the employee's role?",
                choices: roles
              }
            ])
              .then(roleChoice => {
                const roles = roleChoice.role;
                crit.push(roles);
                const managerSql =  `SELECT * FROM employee`;
                connection.query(managerSql, (error, data) => {
                  if (error) throw error;
                  const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'manager',
                      message: "Who is the employee's manager?",
                      choices: managers
                    }
                  ])
                    .then(managerChoice => {
                      const manager = managerChoice.manager;
                      crit.push(manager);
                      const sql =   `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                      connection.query(sql, crit, (error) => {
                      if (error) throw error;
                      console.log("Employee has been added!")
                      viewAllEmployees();
                });
              });
            });
          });
       });
    });
  };

  const addRole = () => {
    const sql = 'SELECT * FROM department'
    connection.query(sql, (error, response) => {
        if (error) throw error;
        let deptNamesArray = [];
        response.forEach((department) => {deptNamesArray.push(department.department_name);});
        deptNamesArray.push('Create Department');
        inquirer
          .prompt([
            {
              name: 'departmentName',
              type: 'list',
              message: 'Which department is this new role?',
              choices: deptNamesArray
            }
          ])
          .then((answer) => {
            if (answer.departmentName === 'Create Department') {
              this.addDepartment;
            } else {
              role(answer);
            }
          });
        
          const role = (departmentData) => {
            inquirer
              .prompt([
                {
                  name: 'newRole',
                  type: 'input',
                  message: 'What is the name of your new role?',
                  
                },
                {
                  name: 'salary',
                  type: 'input',
                  message: 'What is the salary of this new role?',
                  
                }
              ])
              .then((answer) => {
                  createRole = answer.newRole;
                  let departmentId;
                  response.forEach((department) => {
                    if (departmentData.departmentName === department.department_name) {departmentId = department.id;}
                  });
                  let sql =   `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                  let crit = [createdRole, answer.salary, departmentId];
                  connection.query(sql, crit, (error) => {
                    if (error) throw error;
                    viewAllRoles();
                });
              })
            }
        })
    }

    const addDepartment = () => {
        inquirer.prompt([
          {
            type: 'input',
            name: 'newDepartment',
            message: "What is the new department name?",
          }
        ])
        .then((answer) => {
            let sql =   `INSERT INTO department (department_name) VALUES (?)`;
            connection.query(sql, answer.newDepartment, (error) => {
                if (error) throw error;
                viewAllDepartments();
        })

    })
};


promptUser();