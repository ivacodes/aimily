var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

// ++GET users temporary function to see what's being added to user database, not used for the app right now
const getUsers = async (req, res, next) => {
  try {
    const results = await db(`SELECT *FROM users ORDER BY id ASC;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
router.get("/", getUsers);

//++ GET goals temporary function to see what's being added to goals database, also not being used now
const getGoals = async (req, res, next) => {
  try {
    const results = await db(`SELECT *FROM goals ORDER BY id ASC;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
router.get("/goals", getGoals);

// ++POST create user name and email. add it to "users" table
router.post("/", async (req, res, next) => {
  const { name, email } = req.body;
  try {
    await db(`insert into users (name, email) values ("${name}", "${email}");`);
    res.status(200).send({ msg: "ok" });
  } catch (err) {
    res.status(500).send(err);
  }
});

//++POST create goal with deadline and description, add it to "goals" and "users_and_goals" table

router.post("/goals", async (req, res, next) => {
  const { goal, deadline, description } = req.body;
  try {
    await db(
      `insert into goals (goal, deadline, description) values ("${goal}", "${deadline}", "${description}");`
    );
    try {
      const lastUserId = await db(
        `SELECT ID FROM USERS ORDER BY ID DESC LIMIT 1;`
      );
      try {
        lastGoalId = await db(`SELECT ID FROM GOALS ORDER BY ID DESC LIMIT 1;`);
        try {
          await db(
            `insert into users_and_goals (users_id, goal_id ) values ("${lastUserId.data[0].ID}", "${lastGoalId.data[0].ID}");`
          );
          res.status(200).send({ msg: "ok" });
        } catch (err) {
          res.status(500).send(err);
        }
      } catch (err) {
        res.status(500).send(err);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//++ GET users and goals temporary function to see what's inside users and goals, tested but haven't used
/*const getUsersAndGoals = async (req, res, next) => {
  try {
    const results = await db(`SELECT * FROM users_and_goals ORDER BY id ASC;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
router.get("/users_and_goals", getUsersAndGoals);
*/

//++POST to connect user and goal in database

router.post("/users_and_goals", async (req, res, next) => {
  const { users_id, goal_id } = req.body;
  try {
    await db(
      `insert into users_and_goals (users_id, goal_id ) values ("${users_id}", "${goal_id}");`
    );
    req.params.users_id = users_id;
    getUserWithGoalById(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

//++GET all info(name, goal, deadline, description) on a specific user. Sorry, I am not sure if it is used right now in the app but it was tested and it works

const getUserWithGoalById = async (req, res, next) => {
  const { users_id } = req.params; //works with req.body as well need to check which is better for my case

  try {
    const results = await db(
      `SELECT users.name , goals.goal, goals.deadline, goals.description FROM users_and_goals INNER JOIN users ON users_and_goals.users_id = users.id INNER JOIN goals ON users_and_goals.goal_id=goals.id WHERE users.id="${users_id}";`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
router.get("/:users_id", getUserWithGoalById);

module.exports = router;
