const Users = require("./user_model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const privateKey = process.env.SECRET_KEY;

module.exports.signUp = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const user = await Users.create({
      name,
      email,
      password,
    });
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.send(err.message);
  }
};

// console.log(
//   jwt.sign({ name: "harish", email: "harish@mail.com" }, privateKey, {
//     algorithm: "HS256",
//     // expiresIn: jwtExpirySeconds,
//   })
// );

module.exports.signIn = async (req, res, next) => {
  // fetch user and test password verification
  const { name, email, password } = req.body;
  Users.findOne({ email }, function (err, user) {
    if (!user)
      return res.status(200).json({
        message: "user not found",
      });
    if (err) throw err;
    user.comparePassword(password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ name, email }, privateKey, {
          algorithm: "HS256",
          // expiresIn: jwtExpirySeconds,
        });
        res.status(200).json(token);
      }
    });
  });
};
