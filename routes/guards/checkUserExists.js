const db = require("../../model/helper");

checkUserExists = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const nameExists = await db(`select * from users where name="${name}";`);
    const emailExists = await db(`select * from users where email="${email}";`);
    console.log(nameExists.data.length);
    if (nameExists.data.length || emailExists.data.length)
      return res
        .status(409)
        .send({ msg: "User with these credentials exists" });
  } catch (err) {
    res.status(409).send({ msg: err });
  }
  next();
};

module.exports = checkUserExists;
