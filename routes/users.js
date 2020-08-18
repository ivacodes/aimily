var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretword = process.env.SECRETWORD;
const checkUserLoggedIn = require("./guards/checkUserLoggedIn");
const checkUserExists = require("./guards/checkUserExists");

router.use(bodyParser.json());

// ++ POST create new user and add it to the users table. Passwords are encrypted
router.post("/", checkUserExists, async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    await db(
      `insert into users (name, email, password) values ("${name}", "${email}", "${password}");`
    );
    res.status(200).send({ msg: "ok" });
  } catch (err) {
    res.status(500).send({ msg: err });
  }
});

//POST login route, if login info is correct, return authentication token
router.post("/login", async (req, res, next) => {
  const { name, password } = req.body;
  try {
    //find user in DB
    const results = await db(`select * from users where name='${name}'`);
    //if user found
    if (results.data.length) {
      console.log("user found");
      // compare inputed password with hash in db
      const passCorrect = await bcrypt.compare(
        password,
        results.data[0].password
      );
      // if pass correct pass token to front end
      if (passCorrect) {
        let token = jwt.sign({ userId: results.data[0].id }, secretword);
        res.send({ message: "User OK", token });
      } else {
        //pass not correct
        res.status(401).send({ errMessage: "Incorrect login details" });
      }
    } else {
      //user not found
      res.status(401).send({ errMessage: "Incorrect login details" });
    }
  } catch (err) {
    console.log(err);
  }
});

//after user logs in, get user details
router.get("/user", checkUserLoggedIn, async (req, res) => {
  console.log("yay user", req.userId, " is logged in");
  try {
    result = await db(`select * from users where id='${req.userId}';`);
    res.send(result.data);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

//POST goals - insert goal in goals table
router.post("/goals", checkUserLoggedIn, async (req, res) => {
  const { goal, deadline, description, userId } = req.body;
  try {
    await db(
      `insert into goals (goal, deadline, description, user) values ('${goal}','${deadline}','${description}','${userId}');`
    );
    res.status(200).send({ message: "goal inserted" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "goal insertion failed" });
  }
});

//GET goals - get all goals for one user id
router.get("/goals/:userId", checkUserLoggedIn, async (req, res) => {
  const { userId } = req.params;
  try {
    const results = await db(`select * from goals where user='${userId}';`);
    res.send(results.data);
  } catch (err) {
    res.status(404);
  }
});

module.exports = router;
