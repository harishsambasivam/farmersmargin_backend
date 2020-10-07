const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });
const jwt = require("jsonwebtoken");
const privateKey = process.env.SECRET_KEY;

module.exports.jwtVerify = (req, res, next) => {
  console.log("verifying token...");
 // const token = req.headers.authorization.split(" ")[1];
 // jwt.verify(token, privateKey, function (err, decoded) {
  //  if (decoded.name) {
     next();
  //  }
 // });
};
