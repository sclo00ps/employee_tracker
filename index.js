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

/*
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
        updateRole();
      } else {
        connection.end();
      }
    });
};
*/
const start = () => {
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
        addDepartment();
        break;
  
      case 'Add a role':
        addRole();
        break;
  
      case 'Add an employee':
       addEmployee();
        break;
  
        case 'View departments':
        departmentView();
        break;
  
      case 'View roles':
        viewRole();
        break;
  
      case 'View employees':
        viewEmployee();
        break;
  
      case 'Update employee roles':
        updateRole();
        break;
     
      default:
        console.log(`Invalid action: ${answer.action}`);
        break;
    }
  });
  };
/*
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
*/
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
      console.log(`You want to view "${answer.roleView}"`);
      connection.query(
        'SELECT title FROM role WHERE ?',
        { title: answer.roleView },
        (err, res) => {
          if (err) throw err;
          if (res[0]) {
            console.log(
          `Title: ${res[0].title} || Salary: ${res[0].salary} || Department ID: ${res[0].department_id}`
         // `Title: ${res.title} || Salary: ${res.salary} || Department ID: ${res.department_id}`
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

const viewEmployee = () => {
  inquirer
    .prompt([
    {
      name: 'empFirst',
      type: 'input',
      message: 'What the first name of the employee you would like to view?',
    },
    {
      name: 'empLast',
      type: 'input',
      message: 'What is the last name of the employee?',
    },
    
    ])
    
    .then((answer) => {
      console.log(`You want to view "${answer.empFirst} ${answer.empLast}"`);
      connection.query(
        'SELECT * FROM employee WHERE ?',
        { first_name: answer.empFirst,
          last_name: answer.empLast,
        },
        (err, res) => {
          if (err) throw err;
          if (res[0]) {
            console.log(
             `"First Name": ${res[0].first_name} || "Last Name": ${res[0].last_name} || "Role ID": ${res[0].role_id} || "Manager ID": ${res[0].manager_id}`
           // `Title: ${res.title} || Salary: ${res.salary} || Department ID: ${res.department_id}`
            );
            viewData();
          } else {
            console.error('Employee not found :(\n');
            viewData();
          }
        }
      );
    });
};

const updateRole = () => {
  inquirer
    .prompt({
      name: 'roleUpdate',
      type: 'input',
      message: 'What employee role would you like to update?',
    })
    .then((answer) => {
      const query = 'UPDATE auctions SET ? WHERE ?';
      connection.query(query, { title: answer.roleupdate }, (err, res) => {
        if (err) throw err;
        res.forEach(({ title }) => {
          console.log(
            `Role: ${title}`
          );
        });
        viewData();
      });
    });
};


  



  
// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  start();
});
