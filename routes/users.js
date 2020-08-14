var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supersecret = process.env.SUPER_SECRET;
const checkUserLoggedIn = require("./guards/checkUserLoggedIn");

router.use(bodyParser.json());

// ++ POST create new user and add it to the users table. Passwords are encrypted
router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    await db(
      `insert into users (name, email, password) values ("${name}", "${email}", "${password}");`
    );
    res.status(200).send({ msg: "ok" });
  } catch (err) {
    // console.log("User exists");
    res.status(500).send({ msg: "User with those credentials already exists" });
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
        let token = jwt.sign({ userId: results.data[0].id }, supersecret);
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

//after user logs in, get user details, used in app.js to validate token
router.get("/user", checkUserLoggedIn, async (req, res) => {
  console.log("yay user", req.userId, " is logged in");
  try {
    result = await db(`select * from users where id='${req.userId}';`);
    res.send(result.data);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

//POST goals insert goal in goals table
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

//GET goals for one user
router.get("/goals/:userId", checkUserLoggedIn, async (req, res) => {
  const { userId } = req.params;
  try {
    const results = await db(`select * from goals where user='${userId}';`);
    res.send(results.data);
  } catch (err) {
    res.status(404);
  }
});

//++POST create goal with deadline and description, add it to "goals" and "users_and_goals" table
// router.post("/goals", async (req, res, next) => {
//   const { goal, deadline, description } = req.body;
//   try {
//     await db(
//       `insert into goals (goal, deadline, description) values ("${goal}", "${deadline}", "${description}");`
//     );
//     try {
//       const lastUserId = await db(
//         `SELECT ID FROM USERS ORDER BY ID DESC LIMIT 1;`
//       );
//       try {
//         lastGoalId = await db(`SELECT ID FROM GOALS ORDER BY ID DESC LIMIT 1;`);
//         try {
//           await db(
//             `insert into users_and_goals (users_id, goal_id ) values ("${lastUserId.data[0].ID}", "${lastGoalId.data[0].ID}");`
//           );
//           res.status(200).send({ msg: "ok" });
//         } catch (err) {
//           res.status(500).send(err);
//         }
//       } catch (err) {
//         res.status(500).send(err);
//       }
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

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
// router.post("/users_and_goals", async (req, res, next) => {
//   const { users_id, goal_id } = req.body;
//   try {
//     await db(
//       `insert into users_and_goals (users_id, goal_id ) values ("${users_id}", "${goal_id}");`
//     );
//     req.params.users_id = users_id;
//     getUserWithGoalById(req, res);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// ++GET all info(name, goal, deadline, description) on a specific user. Sorry, I am not sure if it is used right now in the app but it was tested and it works

// const getUserWithGoalById = async (req, res, next) => {
//   const { userId } = req.userId; //works with req.body as well need to check which is better for my case
//   try {
//     const results = await db(
//       `SELECT users.name , goals.goal, goals.deadline, goals.description FROM users_and_goals INNER JOIN users ON users_and_goals.users_id = users.id INNER JOIN goals ON users_and_goals.goal_id=goals.id WHERE users.id="${users_id}";`
//     );
//     res.send(results.data);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

module.exports = router;
