/*
Fill in code to do GET, POST, PUT, DELETE for users table here.
*/

const connection = require("./database");
const validate = require("./validation");

const express = require("express");

router = express.Router();

module.exports = router;

router.post("/users", (request, response) => {
  if (validate.is_blank(request.body.nric)) {
    response.status(400).send("Error! NRIC is blank.");
  } else if (validate.is_blank(request.body.name)) {
    response.status(400).send("Error! Name is blank.");
  } else if (validate.is_blank(request.body.email)) {
    response.status(400).send("Error! Email is blank.");
  } else if (validate.is_blank(request.body.mobile)) {
    response.status(400).send("Error! Mobile Number is blank.");
  } else if (validate.is_blank(request.body.password)) {
    response.status(400).send("Error! Password is blank.");
  } else {
    connection.query(
      `insert into users (nric, name, email, mobile, password) values ('${request.body.nric}','${request.body.name}','${request.body.email}','${request.body.mobile}', '${request.body.password}')`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send("User saved successfully");
        }
      }
    );
  }
});

router.get("/users/all", (request, response) => {
  connection.query(`select * from users`, (errors, results) => {
    if (errors) {
      console.log(errors);
      response.status(500).send("Error ocurred while querying");
    } else {
      response.send(results);
    }
  });
});

router.get("/users/id", (request, response) => {
  if (validate.is_blank(request.body.id)) {
    response.status(400).send("Error! ID is blank");
  } else {
    connection.query(
      `select * from users where user_id = ${request.body.id}`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send(results);
        }
      }
    );
  }
});

router.put("/users/email", (request, response) => {
    if (validate.is_blank(request.body.id)) {
      response.status(400).send("Error! ID is blank.");
    } else if (validate.is_blank(request.body.email)) {
      response.status(400).send("Error! Email is blank.");
    } else {
      connection.query(
        `update users set email = '${request.body.email}' where user_id = '${request.body.id}'`,
        (errors, results) => {
          if (errors) {
            console.log(errors);
            response.status(500).send("Error ocurred while querying");
          } else {
            response.send("User email updated successfully");
          }
        }
      );
    }
  });

router.put("/users/mobile", (request, response) => {
  if (validate.is_blank(request.body.id)) {
    response.status(400).send("Error! ID is blank.");
  } else if (validate.is_blank(request.body.mobile)) {
    response.status(400).send("Error! Mobile is blank.");
  } else {
    connection.query(
      `update users set mobile = '${request.body.mobile}' where user_id = '${request.body.id}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send("Customer mobile updated successfully");
        }
      }
    );
  }
});

router.put("/users/password", (request, response) => {
    if (validate.is_blank(request.body.id)) {
      response.status(400).send("Error! ID is blank.");
    } else if (validate.is_blank(request.body.password)) {
      response.status(400).send("Error! Password is blank.");
    } else {
      connection.query(
        `update users set password = '${request.body.password}' where user_id = '${request.body.id}'`,
        (errors, results) => {
          if (errors) {
            console.log(errors);
            response.status(500).send("Error ocurred while querying");
          } else {
            response.send("Customer password updated successfully");
          }
        }
      );
    }
  });

router.delete("/users/id", (request, response) => {
  if (validate.is_blank(request.body.id)) {
    response.status(400).send("Error! ID is blank");
  } else {
    connection.query(
      `delete from users where user_id = '${request.body.id}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send("User deleted successfully");
        }
      }
    );
  }
});