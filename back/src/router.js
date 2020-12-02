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

router.get("/winetype", middleware.isLoggedIn, (req, res) => {
  con.query(`SELECT * FROM wine_types`, (err, result) => {
    if (err || result.length === 0) {
      err
        ? res.status(400).json({ msg: "Problem with DB." })
        : res.status(400).json({ msg: "No wine type records found." });
    } else {
      res.json(result);
    }
  });
});

router.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    const email = req.body.email.toLowerCase();
    con.query(
      `SELECT * FROM w_users WHERE email = '${email}'`,
      (err, result) => {
        if (err || result.length === 0) {
          err
            ? res.status(400).json({ msg: "Problem with DB." })
            : res.status(400).json({ msg: "No such user." });
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
                    { userId: result[0].id, email: result[0].email },
                    "SECRETKEY",
                    { expiresIn: "7d" }
                  );
                  res.status(200).json({ msg: "Logged In", token });
                }
              }
            }
          );
        }
      }
    );
  } else {
    res.status(400).json({ msg: "User email or password not entered." });
  }
});

router.post("/addtype", middleware.isLoggedIn, (req, res) => {
  console.log(req.body);
  if (
    req.body.name !== "" &&
    req.body.reqion !== "" &&
    req.body.type !== "" &&
    req.body.year !== ""
  ) {
    // TODO: check if there is already a wine that is wanted to submit
    con.query(
      `INSERT INTO wine_types (name, region, type, year) VALUES('${req.body.name}', '${req.body.region}', '${req.body.type}', ${req.body.year})`,
      (err, result) => {
        if (err) {
          res.status(400).json({
            msg: "We cannot add your wine to DB. Please try again later.",
          });
        } else {
          res.status(200).json({ msg: "Your wine type added to DB." });
        }
      }
    );
  } else {
    res
      .status(400)
      .json({ msg: "Check if you have filled all required fields." });
  }
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
