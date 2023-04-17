const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const user_Router = express.Router();

user_Router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.status(403).json({
        status: "user already exists",
      });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (!err) {
          try {
            const userdata = await UserModel.create({
              email: email,
              password: hash,
            });
            res.status(201).json({
              status: "registered successfully",
              userdata,
            });
          } catch (e) {
            message: e.message;
          }
        }
      });
    }
  } catch (e) {
    message: e.message;
  }
});
user_Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      let result = await bcrypt.compare(password, user.password);
      console.log(result);
      if (result) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: user._id,
          },
          "secret"
        );
        console.log(token)
        res.status(200).json({
          status: "ok",
          token,
        });
      } else {
        res.status(401).json({
          status: "password does not match",
        });
      }
    } else {
      res.status(404).json({
        status: "user does not exist",
      });
    }
  } catch (e) {
    message: e.message;
  }
});

module.exports = user_Router;
