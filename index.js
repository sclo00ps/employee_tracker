const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // port; if not 3306
  port: 3306,

  //username
  user: 'root',

  //MySQL db and password
  password: 'password',
  database: 'employee_trackerDB',
});


const start = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'Add',
        'View',
        'Update',
      ],
    })

    .then((answer) => {
      // based on their answer, either call the bid or the post functions
      if (answer.action === 'Add') {
        addData();
      } else if (answer.action === 'View') {
        viewData();
      } else if (answer.action === 'Update') {
        updateEmployee();
      } else {
        connection.end();
      }
    });
};
const addData = () => {
  // prompt for info about the item being put up for auction
  //START HERE
  inquirer
    .prompt({
      name: 'add',
      type: 'list',
      message: 'Would you like to add a department or an employee role?',
      choices: ['DEPARTMENT', 'ROLE', 'EMPLOYEE'],
    })
    .then((answer) => {
      // based on their answer, either call the bid or the post functions
      if (answer.add === 'DEPARTMENT') {
        addDepartment();
      } else if (answer.add === 'ROLE') {
        addRole();
      } else if (answer.add === 'EMPLOYEE') {
        addEmployee();
      } else {
        start();
      }
    });
};
const addDepartment = () => {
  // prompt for department
  inquirer
    .prompt({
      name: 'deptName',
      type: 'input',
      message: 'What is the new department name?',
    })
    .then((answer) => {
      // when finished prompting, insert a new department into the db 
      connection.query(
        'INSERT INTO department SET ?',
        { name: answer.deptName },

        (err, res) => {
          if (err) throw err;
          console.log('The new department has been added successfully!');
          //  re-prompt the user for new action
          start();
        }
      );
    });
};

const addRole = () => {
  // prompt for role
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What is the employee role?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the role salary',
      },
      {
        name: 'dept',
        type: 'input',
        message: 'What is the role department ID?',
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },

    ])
    .then((answer) => {
      // when finished prompting, insert a new role into the db 
      connection.query(
        'INSERT INTO role SET ?',
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.dept,
        },

        (err) => {
          if (err) throw err;
          console.log('The new employee role has been added successfully!');
          // re-prompt the user for new action
          start();
        }
      );
    });
};

const addEmployee = () => {
  // prompt for employee
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'What is the first name of the employee?',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'What is the last name of the employee?',
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'What is the employee role ID',
        validate: (value) => {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'What is the employee manager ID?',
        validate: (value) => {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },

    ])
    .then((answer) => {
      // when finished prompting, insert a new employeeinto the db 
      connection.query(
        'INSERT INTO employee SET ?',

        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId,

        },
        (err) => {
          if (err) throw err;
          console.log('The new employee name has been added successfully!');
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
};

// function to handle posting new items up for auction
const viewData = () => {
  // prompt for info about the item being put up for auction
  //START HERE
  inquirer
    .prompt({
      name: 'view',
      type: 'list',
      message: 'What would you like to view?',
      choices: ['DEPARTMENT', 'ROLE', 'EMPLOYEE'],
    })
     
    .then((answer) => {
      // based on their answer, either call the bid or the post functions
        if (answer.view === 'DEPARTMENT') {
        viewDepartment();
      } else if (answer.view === 'ROLE') {
        viewRole();
      } else if (answer.view === 'EMPLOYEE') {
        viewEmployee();
      } else {
        start();
      };
    })
  };
  
   
const viewDepartment = () => {
  inquirer
    .prompt({
      name: 'viewDept',
      type: 'input',
      message: 'What department would you like to view?',
    })
    .then((answer) => {
      const query = 'SELECT * FROM department WHERE ?';
      connection.query(query, { name: answer.viewDept }, (err, res) => {
        if (err) throw err;
        res.forEach(({ name }) => {
          console.log(
            `Department: ${name}`
          );
        });
        viewData();
      });
    });
};

const viewRole = () => {
  inquirer
    .prompt({
      name: 'roleView',
      type: 'input',
      message: 'What role would you like to view?',
    })
    .then((answer) => {
      console.log(`You searched for "${answer.roleView}"`);
      connection.query(
        'SELECT * FROM role WHERE ?',
        { role: answer.roleView},
        (err, res) => {
          if (err) throw err;
          if (res[0]) {
            console.log(
              `Title: ${res[0].title} || Salary: ${res[0].salary} || Department ID: ${res[0].department_id}`
            );
            viewData();
          } else {
            console.error('Role not found :(\n');
            viewData();
          }
        }
      );
    });
};

  
/*const viewRole = () => {
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
  inquirer
    .prompt([
      {
      name: 'roleView',
      type: 'rawlist',
      viewRoles() {
        const rolearray = [];
        results.forEach(({ title, salary, department_id}) => {
          roleArray.push(title, salary, department_id);
        });
        return roleArray; 
      },
      message: 'What roles would you like to view?',
    },
    ])
    .then((answer) => {
      let chosenRole;
      results.forEach((role) => {
        if (role.title === answer.roleView) {
          chosenRole = (title,salary, department_id);
        }
      });
        
    //    })
        viewData();
     });
   });
};
*/
/*const viewRole = () => {
  // prompt for role
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',

    ])
    .then((answer) => {
      // when finished prompting, insert a new role into the db 
      connection.query(
        'INSERT INTO role SET ?',
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.dept,
        },

        (err) => {
          if (err) throw err;
          console.log('The new employee role has been added successfully!');
          // re-prompt the user for new action
          start();
        }
      );
    });
};

const addEmployee = () => {
  // prompt for employee
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'What is the first name of the employee?',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'What is the last name of the employee?',
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'What is the employee role ID',
        validate: (value) => {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'What is the employee manager ID?',
        validate: (value) => {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },

    ])
    .then((answer) => {
      // when finished prompting, insert a new employeeinto the db 
      connection.query(
        'INSERT INTO employee SET ?',

        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId,

        },
        (err) => {
          if (err) throw err;
          console.log('The new employee name has been added successfully!');
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
};
*/
/* inquirer
 .prompt({   
       name: 'department',
       type: 'input',
       message: 'What is the department name?'
     });
     */
/*  {
    name: 'startingBid',
    type: 'input',
    message: 'What would you like your starting bid to be?',
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  },
])
//get the input answers and 
.then((answer) => {
  console.log(answer);
  // when finished prompting, insert a new item into the db with that info
  //Todo insert into the db
  createProduct(answer.item, answer.category, answer.starting_bid, answer.highest_bid)

});
};

/*const start = () => {
inquirer
.prompt({
  name: 'action',
  type: 'list',
  message: 'What would you like to do?',
  choices: [
    'Add a new department',
    'Add a new employee role',
    'Add a new employee',
    'View all departments',
    'View all employees',
    'View all roles',
    'Update employee roles',
  ],
})
.then((answer) => {
  switch (answer.action) {
    case 'Add a department':
      departmentAdd();
      break;

    case 'Add a role':
      roleAdd();
      break;

    case 'Add an employee':
      employeeAdd();
      break;

      case 'View departments':
      departmentView();
      break;

    case 'View roles':
      roleView();
      break;

    case 'View employees':
      employeeView();
      break;

    case 'Update employee roles':
      employeeRoleUpdate();
      break;
   
    default:
      console.log(`Invalid action: ${answer.action}`);
      break;
  }
});
};


  
 
 

  */
// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  start();
});
