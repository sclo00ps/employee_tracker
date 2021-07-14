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
        'Update'
      ],
    })

    .then((answer) => {
      // based on their answer, either call the bid or the post functions
      if (answer.action === 'Add') {
        addData();
      } else if (answer.action === 'View') {
        viewdData();
      } else if (answer.action === 'Update') {
        updateEmployee();
      } else {
        connection.end();
      }
    });
};

// function to handle posting new items up for auction
const addData = () => {
  // prompt for info about the item being put up for auction
  //START HERE
  inquirer
    .prompt({
        name: 'add',
        type: 'list',
        message: 'Would you like to add a deparrtment or an employee role?',
        choices: ['DEPARTMENT', 'ROLE'],
      })
      .then((answer) => {
        // based on their answer, either call the bid or the post functions
        if (answer.add === 'DEPARTMENT') {
          addDepartment();
        } else if (answer.add === 'ROLE') {
          addRole();
        } else {
          start();
        }
      });
  };
  inquirer
  .prompt({   
        name: 'department',
        type: 'input',
        message: 'What is the department name?'
      });
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

// function to handle add new dept
const departmentAdd = () => {
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
          {deptName: answer.deptName},
               
          (err,res) => {
            if (err) throw err;
            console.log('The new department has been added successfully!');
            //  re-prompt the user for new action
            start();
          }
        );
      });
  };
      
  const roleAdd = () => {
    // prompt for role
    inquirer
      .prompt({
          name: 'roleTitle',
          type: 'input',
          message: 'What is the new employee role title?',
        })
        .then((answer) => {
          // when finished prompting, insert a new role into the db 
          connection.query(
            'INSERT INTO role SET ?',
            
            {
              role_title: answer.role,
              role_salary: answer.role,
              role_department: answer.role,
                        
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
    
    const employeeAdd = () => {
      // prompt for employee
      inquirer
        .prompt({
            name: 'employee',
            type: 'input',
            message: 'What is the new employee name?',
          })
          .then((answer) => {
            // when finished prompting, insert a new employeeinto the db 
            connection.query(
              'INSERT INTO employee SET ?',
              
              {
                employee_first_name: answer.employee,
                employee_last_name: answer.employee,
                employee_role_id: answer.employee,
                employee_manager_id: answer.employee,
                                    
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
// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  start();
});
