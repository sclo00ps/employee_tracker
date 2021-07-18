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

//start displays all actions user can select
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
      'View all roles',
      'View all employees',
      'Update employee roles',
    ],
  })
  .then((answer) => {
    switch (answer.action) {
      case 'Add a new department':
        addDepartment();
        break;
  
      case 'Add a new employee role':
        addRole();
        break;
  
      case 'Add a new employee':
       addEmployee();
        break;
  
        case 'View all departments':
        viewDepartment();
        break;
  
      case 'View all roles':
        viewRole();
        break;
  
      case 'View all employees':
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
//add new department 
const addDepartment = () => {
  // prompt for department
  inquirer
    .prompt({
      name: 'deptName',
      type: 'input',
      message: 'What is the new department name?',
      validate: (value) => { if (value) { return true } else { return 'a value must be entered to continue' } }
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

//add new role 
const addRole = () => {
  // prompt for role
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What is the employee role?',
        validate: (value) => { if (value) { return true } else { return 'a value must be entered to continue' } }
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the role salary',
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
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

////add new employee
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

//view all departments
const viewDepartment = (answer) => {
 
  const query = 'SELECT * FROM department';
      connection.query(query, (err, res) => {
     // connection.query(query, { name: answer.viewDept }, (err, res) => {
        if (err) throw err;
        res.forEach(({ name }) => console.log(name));
       start();
        });
  };

  const viewRole = (answer) => {
     const query = 'SELECT * FROM role';
        connection.query(query, (err, res) => {
       // connection.query(query, { name: answer.viewDept }, (err, res) => {
          if (err) throw err;
          res.forEach(({ title }) => console.log(title));
          start();
          });
    };
//view all employees
  const viewEmployee = (answer) => {
    const query = 'SELECT * FROM employee';
         connection.query(query, (err, res) => {
        // connection.query(query, { name: answer.viewDept }, (err, res) => {
           if (err) throw err;
           res.forEach(({first_name, last_name}) => console.log(first_name, last_name));
           start();
           });
     };

// see pg 4/5 in 6/14/21 file for sample code select and then update

//update employee id
const updateRole = () => {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;
    //// once you have the role_ids, prompt the user for which they'd like to change
  inquirer
    .prompt({
      name: 'roleIdUp',
      type: 'input',
      choices () {
        const roleIdUpArray = [];
        results.forEach(({ role_id }) => {
          roleIdUpArray.push(role_id);
        });
        return 
      },
      message: 'What employee role ID would you like to update?',
    })

    .then((answer) => {
     // const query = 'UPDATE employee SET role_id WHERE ?';
     let chosenRole;
     results.forEach((role_id) => {
      if (employee.role_id === answer.roleIdUp) {
        chosenRole = role_id;
      }
    });

    
 //update the chosen role_id 
if (chosenRole.role_id === (answer.role_id)) {
  
  connection.query(
    'UPDATE employee SET ? WHERE ?',
    [
      {
        new_role: answer.role_id,
      },
      {
        id: chosenRole.role_id,
      },
    ],
    (error) => {
      if (error) throw err;
      console.log('Role updated successfully!');
      start();
    }
  );
} else {
  // if role not updated vstart over
  console.log('The role was not updated.');
  start();
}
});
});
};

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  start();
});
