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

router.put('/:userId/password', (req, res) => {
     const userId = req.params.userId;
     const oldPassword = req.body.oldPassword;
     const newPassword = req.body.newPassword;

     if (validate.isBlank(oldPassword)) {
          res.status(400).send('Error! Old Password is blank.'); return;
     }
     if (validate.isBlank(newPassword)) {
          res.status(400).send('Error! New Password is blank.'); return;
     }

     // check whether old password match the record in db
     connection.query(
          `SELECT user_id FROM users WHERE (user_id = ?) AND (password = ?)`,
          [userId, oldPassword],
          (errors, results) => {
               if (errors) {
                    console.log(errors);
                    res.status(400).send('Error ocurred while sending request.');
               } else {
                    if (results.length === 0) {
                         res.status(400).send('Error! old password does not match record');
                    } else {
                         // password match, so we can go ahead and update record in db
                         connection.query(
                              `UPDATE users SET password = ? WHERE user_id = ?`,
                              [newPassword, userId],
                              (errors, results) => {
                                   if (errors) {
                                        console.log(errors);
                                        res.status(400).send('Error ocurred while sending request.');
                                   } else {
                                        res.send('Password updated successfully')
                                   }
                              });
                    }
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