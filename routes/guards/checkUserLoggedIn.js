const jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

checkUserLoggedIn = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log("check 1");

  if (token) {
    jwt.verify(token, supersecret, function (err, decoded) {
      if (err) res.status(401).send({ message: err.message });
      else {
        const { userId } = decoded;
        req.userId = userId;
        console.log("inside guard");
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Please log in" });
  }
};

module.exports = checkUserLoggedIn;
