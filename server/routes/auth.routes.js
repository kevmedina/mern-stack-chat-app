const { Router } = require("express");
const router = new Router();

const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const saltRounds = 12;
const passport = require("passport");
const User = require("../models/User.model");

// Post route for user to sign up
router.post("/api/signup", (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(401).json({
      message: "All fields are required to create an account.",
    });
    return;
  }
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).json({
      message:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        username,
        email,
        password: hashedPassword,
      });
    })
    .then((user) => {
      req.login(user, (err) => {
        if (err)
          return res.status(500).json({ message: "Login unsuccessful!", user });
        user.password = undefined;
        res.status(200).json({ message: "Login unsuccessful!", user });
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(500).json({ message: err.message });
      } else if (err.code === 11000) {
        res.status(500).json({
          message:
            "Username and email need to be unique. Either username or email is already used.",
        });
      } else {
        next(err);
      }
    })
    .catch((err) => next(err));
});

// Post route for user to login
router.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong with the database query." });
    } else if (!user) {
      res.status(401).json(failureDetails);
    } else {
      req.login(user, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Something went wrong with the login." });
          user.password = undefined;
          res.status(200).json({ message: "Login Successful!", user });
        }
      });
    }
  })(req, res, next);
});

// Post route for user to logout
router.post("/api/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Logout Successful!" });
});

module.exports = router;
