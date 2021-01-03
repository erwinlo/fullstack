const connection = require('./database');
const validate = require('./validation');
const express = require('express');

router = express.Router();

router.put('/:userId', (req, res) => {
     const userId = req.params.userId;
     const email = req.body.email;

     if (validate.isBlank(email)) {
          res.status(400).send({ message: 'Error! Email is blank.' }); 
          return;
     }

     connection.query(
          `UPDATE users SET email = ? WHERE user_id = ?`,
          [email, userId],
          (errors, results) => {
               if (errors) {
                    console.log(errors);
                    res.status(400).send({ message: 'Error ocurred while sending request.' });
               } else {
                    res.send({ message: 'Email updated successfully' })
               }
          });
});

module.exports = router;