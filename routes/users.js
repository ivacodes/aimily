var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");
const { request } = require("../app");

router.use(bodyParser.json());

// ++GET users temporary function to see what's being added to user database
const getUsers = async (req, res, next) => {
  try {
    const results = await db(`SELECT *FROM users ORDER BY id ASC;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
router.get("/", getUsers);

//++ GET goals temporary function to see what's being added to goals database
const getGoals = async (req, res, next) => {
  try {
    const results = await db(`SELECT *FROM goals ORDER BY id ASC;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
router.get("/goals", getGoals);

// ++POST create user name
router.post("/", async (req, res, next) => {
  const { name, email } = req.body;
  try {
    await db(`insert into users (name, email) values ("${name}", "${email}");`);
    // getUsers(req, res);
    res.status(200).send("Added a new user");
  } catch (err) {
    res.status(500).send(err);
  }
});

//++POST create goal with deadline

router.post("/goals", async (req, res, next) => {
  const { goal, deadline, description } = req.body;
  try {
    await db(
      `insert into goals (goal, deadline, description) values ("${goal}", "${deadline}", "${description}");`
    );
    //getGoals(req, res);
    res.status(200).send("Added a new goal");
  } catch (err) {
    res.status(500).send(err);
  }
});

//++ GET users and goals temporary function to see what's inside users and goals
const getUsersAndGoals = async (req, res, next) => {
  try {
    const results = await db(`SELECT * FROM users_and_goals ORDER BY id ASC;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
router.get("/users_and_goals", getUsersAndGoals);
//POST connect user and goal in database
//mysql> insert into users_and_goals (users_id, goal_id) VALUES (1,2);

router.post("/users_and_goals", async (req, res, next) => {
  const { users_id, goal_id } = req.body;
  try {
    await db(
      `insert into users_and_goals (users_id, goal_id ) values ("${users_id}", "${goal_id}");`
    );
    getUsersAndGoals(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET all info on specific user
//select users.name , goals.goal, goals.deadline, goals.description from users_and_goals
//INNER JOIN users ON users_and_goals.users_id = users.id INNER JOIN goals ON users_and_goals.goal_id=goals.id;

const getUserWithGoalById = async (req, res, next) => {
  const { users_id } = req.body;

  try {
    const results = await db(
      `SELECT * FROM users_and_goals where id="${users_id}";`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
router.get("/:users_id", getUserWithGoalById);

module.exports = router;
