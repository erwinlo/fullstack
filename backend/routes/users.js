/*
Fill in code to do GET, POST, PUT, DELETE for users table here.
*/

const connection = require("./database");

const express = require("express");

router = express.Router();


router.post("/:userId", (req, res) => {
//   if (validate.is_blank(req.params.nric)) {
//     res.status(400).send("Error! NRIC is blank.");
//   } else if (validate.is_blank(req.params.name)) {
//     res.status(400).send("Error! Name is blank.");
//   } else if (validate.is_blank(req.params.email)) {
//     res.status(400).send("Error! Email is blank.");
//   } else if (validate.is_blank(req.params.mobile)) {
//     res.status(400).send("Error! Mobile Number is blank.");
//   } else if (validate.is_blank(req.params.password)) {
//     res.status(400).send("Error! Password is blank.");
//   } else {
    connection.query(
      `insert into users (u.nric, u.name, u.email, u.mobile, u.password) values ('${req.params.nric}','${req.params.name}','${req.params.email}','${req.params.mobile}', '${req.params.password}')`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          res.status(500).send("Error ocurred while querying");
        } else {
          res.send("User saved successfully");
        }
      }
    );
  });

router.get("/:userId", (req, res) => {
    connection.query(
      `SELECT u.nric, u.name, u.email, u.mobile, u.password
               FROM users AS u 
               WHERE (u.user_id = ${req.params.userId})`,
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
  }
);

router.put("/users/email", (req, res) => {
//     if (validate.is_blank(req.params.id)) {
//       res.status(400).send("Error! ID is blank.");
//     } else if (validate.is_blank(req.params.email)) {
//       res.status(400).send("Error! Email is blank.");
//     } else {
      connection.query(
        `update users set u.email = '${req.params.email}' where u.user_id = '${req.params.id}'`,
        (errors, results) => {
          if (errors) {
            console.log(errors);
            res.status(500).send("Error ocurred while querying");
          } else {
            res.send("User email updated successfully");
          }
        }
      );
    }
  );

router.put("/users/mobile", (req, res) => {
//   if (validate.is_blank(req.params.id)) {
//     res.status(400).send("Error! ID is blank.");
//   } else if (validate.is_blank(req.params.mobile)) {
//     res.status(400).send("Error! Mobile is blank.");
//   } else {
    connection.query(
      `update users set u.mobile = '${req.params.mobile}' where u.user_id = '${req.params.id}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          res.status(500).send("Error ocurred while querying");
        } else {
          res.send("Customer mobile updated successfully");
        }
      }
    );
  }
);

router.put("/users/password", (req, res) => {
//     if (validate.is_blank(req.params.id)) {
//       res.status(400).send("Error! ID is blank.");
//     } else if (validate.is_blank(req.params.password)) {
//       res.status(400).send("Error! Password is blank.");
//     } else {
      connection.query(
        `update users set u.password = '${req.params.password}' where u.user_id = '${req.params.id}'`,
        (errors, results) => {
          if (errors) {
            console.log(errors);
            res.status(500).send("Error ocurred while querying");
          } else {
            res.send("Customer password updated successfully");
          }
        }
      );
    }
  );

router.delete("/users/id", (req, res) => {
  // if (validate.is_blank(req.params.id)) {
  //   res.status(400).send("Error! ID is blank");
  // } else {
    connection.query(
      `delete from users where u.user_id = '${req.params.id}'`,
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