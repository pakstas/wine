const express = require("express");
const router = express.Router();
const con = require("./db");
const middleware = require("./middleware/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("OK");
});

router.get("/hidden", middleware.isLoggedIn, (req, res) => {
  res.send("This is hidden information");
});

router.post("/login", (req, res) => {
  const email = req.body.email.toLowerCase();
  con.query(`SELECT * FROM w_users WHERE email = '${email}'`, (err, result) => {
    if (err || result.length === 0) {
      err
        ? res.status(400).json({ msg: "Problem with DB." })
        : res.status(400).json({ msg: "No such user." });
    } else {
      bcrypt.compare(req.body.password, result[0].password, (bErr, bResult) => {
        if (bErr || !bResult) {
          res.status(400).json({ msg: "The username password is not correct" });
        } else {
          if (bResult) {
            const token = jwt.sign(
              { userId: result[0].id, email: result[0].email },
              "SECRETKEY",
              { expiresIn: "7d" }
            );
            res.status(200).json({ msg: "Logged In", token });
          }
        }
      });
    }
  });
});

router.post("/register", middleware.validateRegistration, (req, res) => {
  const email = req.body.email.toLowerCase();
  con.query(`SELECT * FROM w_users WHERE email = '${email}'`, (err, result) => {
    if (err) {
      res.status(400).json({ msg: "The DB is broken." });
    } else if (result.length !== 0) {
      res.status(400).json({ msg: "The user email already exists" });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(400).json(err);
        } else {
          con.query(
            `INSERT INTO w_users (email, password) VALUES ('${email}', '${hash}')`,
            (err, result) => {
              if (err) {
                res.status(400).json(err);
              } else {
                res
                  .status(201)
                  .json({ msg: "USER email has registered succesfully." });
              }
            }
          );
        }
      });
    }
  });
});

module.exports = router;
