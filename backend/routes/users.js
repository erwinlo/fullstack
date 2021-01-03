/*
Fill in code to do GET, POST, PUT, DELETE for users table here.
*/

const connection = require('./database');
const validate = require('./validation');
const express = require('express');

router = express.Router();

router.get('/:userId', (req, res) => {
     connection.query(
          `SELECT name, email, mobile
             FROM users 
             WHERE (user_id = ${req.params.userId})`,
          (errors, results) => {
               if (errors) {
                    console.log(errors);
                    res.status(500).send('Error ocurred while querying');
               } else {
                    if (res.length == 0) {
                         res.status(404).send('Id not found.');
                    }
                    res.send(results);
               }
          }
     );
});

router.post('/', (req, res) => {
     if (validate.isBlank(req.body.nric)) {
          res.status(400).send('Error! NRIC is blank.');
     } else if (validate.isBlank(req.body.name)) {
          res.status(400).send('Error! Name is blank.');
     } else if (validate.isBlank(req.body.email)) {
          res.status(400).send('Error! Email is blank.');
     } else if (validate.isBlank(req.body.mobile)) {
          res.status(400).send('Error! Mobile Number is blank.');
     } else if (validate.isBlank(req.body.password)) {
          res.status(400).send('Error! Password is blank.');
     } else {
          connection.query(
               `insert into users (nric, name, email, mobile, password) values 
      ('${req.body.nric}','${req.body.name}','${req.body.email}','${req.body.mobile}', '${req.body.password}')`,
               (errors, results) => {
                    if (errors) {
                         console.log(errors);
                         res.status(500).send('Error ocurred while querying');
                    } else {
                         res.send('User saved successfully');
                    }
               }
          );
     };
});



router.put('/:userId/mobile', (req, res) => {
     const userId = req.params.userId;
     const mobile = req.body.mobile;

     if (validate.isBlank(mobile)) {
          res.statusMessage = 'Mobile number is blank.';
          res.status(400).send('Error! Mobile number is blank.'); 
          return;
     }

     connection.query(
          `UPDATE users SET mobile = ? WHERE user_id = ?`,
          [mobile, userId],
          (errors, results) => {
               if (errors) {
                    console.log(errors);
                    res.status(400).send('Error ocurred while sending request.');
               } else {
                    res.send('Mobile number updated successfully')
               }
          });
});

router.delete('/:userid', (req, res) => {
     // if (validate.isBlank(req.params.id)) {
     //   res.status(400).send('Error! ID is blank');
     // } else {
     connection.query(
          `delete from users where user_id = '${req.params.userId}'`,
          (errors, results) => {
               if (errors) {
                    console.log(errors);
                    res.status(500).send('Error ocurred while querying');
               } else {
                    res.send('User deleted successfully');
               }
          }
     );
}
);

module.exports = router;