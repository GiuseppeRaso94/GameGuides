const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UsersModel");

login.post("/login", async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({
        statusCode: 401,
        message: "Email or password not valid",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).send({
        statusCode: 401,
        message: "Email or password not valid",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userName: user.userName,
        role: user.role,
        isActive: user.isActive,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res
      .header("authorization", token)
      .status(200)
      .send({ statusCode: 200, message: "Login successfully", token });
  } catch (e) {
    next(e);
  }
});

module.exports = login;
