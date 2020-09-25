const express = require("express");
const { signUp, signIn } = require("./user_controller");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);

module.exports = router;
