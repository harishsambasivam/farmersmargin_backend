const mongoose = require("mongoose");
const { isEmail, isAlphanumeric } = require("validator");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    min: 6,
    trim: true,
    validate: [
      isAlphanumeric,
      "please make sure that it includes alphabets and numbericals",
    ],
  },
  email: {
    type: String,
    required: true,
    min: 4,
    unique: true,
    trim: true,
    validate: [isEmail, "please enter a valid email"],
  },
  name: {
    type: String,
    required: true,
    min: 4,
    trim: true,
  },
});

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("Users", UserSchema);
