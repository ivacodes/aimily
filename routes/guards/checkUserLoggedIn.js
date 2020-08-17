const jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPERSECRET;

//use this guard for every protected call
checkUserLoggedIn = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log("guard checks if token exists");

  if (token) {
    jwt.verify(token, supersecret, function (err, decoded) {
      if (err) res.send({ message: err.message });
      else {
        const { userId } = decoded;
        req.userId = userId;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Please log in" });
  }
};

module.exports = checkUserLoggedIn;
