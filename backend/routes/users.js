/*
Fill in code to do GET, POST, PUT, DELETE for users table here.
*/

const connection = require("./database");
const validate = require('./validation');
const express = require("express");

router = express.Router();

router.get("/:userId", (req, res) => {
  connection.query(
    `SELECT nric, name, email, mobile, password
             FROM users 
             WHERE (user_id = ${req.params.userId})`,
    (errors, results) => {
      if (errors) {
        console.log(errors);
        res.status(500).send("Error ocurred while querying");
      } else {
          if (res.length == 0) {
              res.status(404).send('Id not found.');
          }
          res.send(results);
      }
    }
  );
});

router.post("/", (req, res) => {
  if (validate.is_blank(req.body.nric)) {
    res.status(400).send("Error! NRIC is blank.");
  } else if (validate.is_blank(req.body.name)) {
    res.status(400).send("Error! Name is blank.");
  } else if (validate.is_blank(req.body.email)) {
    res.status(400).send("Error! Email is blank.");
  } else if (validate.is_blank(req.body.mobile)) {
    res.status(400).send("Error! Mobile Number is blank.");
  } else if (validate.is_blank(req.body.password)) {
    res.status(400).send("Error! Password is blank.");
  } else {
    connection.query(
      `insert into users (nric, name, email, mobile, password) values 
      ('${req.body.nric}','${req.body.name}','${req.body.email}','${req.body.mobile}', '${req.body.password}')`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          res.status(500).send("Error ocurred while querying");
        } else {
          res.send("User saved successfully");
        }
      }
    );
  };
});
router.put("/:userId", (req, res) => {
    if (validate.is_blank(req.body.nric)) {
      res.status(400).send("Error! NRIC is blank."); return;
    } 
    if (validate.is_blank(req.body.name)) {
      res.status(400).send("Error! Name is blank."); return;
    }  
    if (validate.is_blank(req.body.email)) {
      res.status(400).send("Error! Email is blank."); return;  
    }  
    if (validate.is_blank(req.body.mobile)) {
      res.status(400).send("Error! Mobile is blank."); return;
    }  
    if (validate.is_blank(req.body.password)) {
      res.status(400).send("Error! password is blank."); return;  
    }
      connection.query(
        `UPDATE users SET nric = '${req.body.nric}', name = '${req.body.name}',
        email = '${req.body.email}', mobile = ${req.body.mobile}, password = '${req.body.password}',
         WHERE user_id = ${req.params.userId} AND password = '${req.body.password}'`,
        (errors, results) => {
          if (errors) {
            console.log(errors);
            res.status(400).send("Error ocurred while sending request.");
          } else {
            res.send("Data updated successfully");
          }
        }
      );
    });

router.delete("/:userid", (req, res) => {
  // if (validate.is_blank(req.params.id)) {
  //   res.status(400).send("Error! ID is blank");
  // } else {
    connection.query(
      `delete from users where user_id = '${req.params.userId}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          res.status(500).send("Error ocurred while querying");
        } else {
          res.send("User deleted successfully");
        }
      }
    );
  }
);

module.exports = router;