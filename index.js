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
      name: 'addORviewORupdate',
      type: 'list',
      message: 'Would you like to add a [ADD] or [VIEW] or [UPDATE] the employee information?',
      choices: ['ADD', 'VIEW', 'UPDATE'],
    })
    .then((answer) => {
      // based on their answer, either call the bid or the post functions
      if (answer.addORviewORupdated === 'ADD') {
        addData();
      } else if (answer.addORviewORupdated === 'VIEW') {
        viewdData();
      } else if (answer.addORviewORupdated === 'UPDATE') {
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
        message: 'Would you like to a [DEPARTMENT] or a [ROLE]?',
        choices: ['DEPARTMENT', 'ROLE'],
      })
      .then((answer) => {
        // based on their answer, either call the bid or the post functions
        if (answer.add === 'DEPARTMENT') {
          addDepartment();
        } else if (answer.A === 'ROLE') {
          addRole();
        } else {
          connection.end();
        }
      });
  };
      
      {
        name: 'category',
        type: 'input',
        message: 'What category would you like to place your auction in?',
      },
      {
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

/*const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'Add departments',
        'Add roles',
        'Add employees',
        'View departments',
        'View roles',
        'View employees',
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
// function to handle posting new items up for auction
const postAuction = () => {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: 'item',
        type: 'input',
        message: 'What is the item you would like to submit?',
      },
      {
        name: 'category',
        type: 'input',
        message: 'What category would you like to place your auction in?',
      },
      {
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
/*const artistSearch = () => {
  inquirer
    .prompt({
      name: 'artist',
      type: 'input',
      message: 'What artist would you like to search for?',
    })
    .then((answer) => {
      const query = 'SELECT position, song, year FROM top5000 WHERE ?';
      connection.query(query, { artist: answer.artist }, (err, res) => {
        res.forEach(({ position, song, year }) => {
          console.log(
            `Position: ${position} || Song: ${song} || Year: ${year}`
          );
        });
        runSearch();
      });
    });
};

const multiSearch = () => {
  const query =
    'SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1';
  connection.query(query, (err, res) => {
    res.forEach(({ artist }) => console.log(artist));
    runSearch();
  });
};
*/
// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  add();
});