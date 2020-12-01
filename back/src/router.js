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
  const username = req.body.username.toLowerCase();
  con.query(
    `SELECT * FROM users WHERE username = '${username}'`,
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        bcrypt.compare(
          req.body.password,
          result[0].password,
          (bErr, bResult) => {
            if (bErr || !bResult) {
              res
                .status(400)
                .json({ msg: "The username password is not correct" });
            } else {
              if (bResult) {
                const token = jwt.sign(
                  { userId: result[0].id, username: result[0].username },
                  "SECRETKEY",
                  { expiresIn: "7d" }
                );
                con.query(
                  `UPDATE users SET last_login_date = now() WHERE id = '${result[0].id}'`
                );

                res.status(200).json({ msg: "Logged In", token });
              }
            }
          }
        );
      }
    }
  );
});

router.post("/register", middleware.validateRegistration, (req, res) => {
  const username = req.body.username.toLowerCase();
  con.query(
    `SELECT * FROM users WHERE username = '${username}'`,
    (err, result) => {
      if (err) {
        res.status(400).json({ msg: "The DB is broken." });
      } else if (result.length !== 0) {
        res.status(400).json({ msg: "The user already exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(400).json(err);
          } else {
            con.query(
              `INSERT INTO users (username, password, registration_date) VALUES ('${username}', '${hash}', now())`,
              (err, result) => {
                if (err) {
                  res.status(400).json(err);
                } else {
                  res
                    .status(201)
                    .json({ msg: "USER has registered succesfully." });
                }
              }
            );
          }
        });
      }
    }
  );
});

module.exports = router;
