const express = require("express");
const UsersModel = require("../models/UsersModel");
const users = express.Router();
const bcrypt = require("bcrypt");

users.get("/users", async (req, res, next) => {
  try {
    const users = await UsersModel.find().populate("posts");
    if (users.length === 0) {
      return res.status(404).send({ message: "No users found" });
    }
    res.status(200).send({ statusCode: 200, users });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

users.get("/users/:id", async (req, res, next) => {
  try {
    const user = await UsersModel.findById(req.params.id).populate({
      path: "posts",
      populate: { path: "user" },
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ statusCode: 200, user });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

users.post("/users/create", async (req, res, next) => {
  try {
    const newUser = new UsersModel(req.body);
    const userToSave = await newUser.save();
    res
      .status(201)
      .send({ statusCode: 201, message: "User saved succesfully", userToSave });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

users.patch("/users/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToUpdate = await UsersModel.findById(id);
    if (!userToUpdate) {
      return res.status(404).send({
        statusCode: 404,
        message: "No user found with the given id",
      });
    }
    let updatedUserData = { ...req.body };
    if (updatedUserData.password) {
      const isPasswordTheSame = await bcrypt.compare(
        updatedUserData.password,
        userToUpdate.password
      );
      if (isPasswordTheSame) {
        const { password, ...dataExceptPassword } = updatedUserData;
        updatedUserData = dataExceptPassword;
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
          updatedUserData.password,
          salt
        );
        updatedUserData = { ...updatedUserData, password: hashedPassword };
      }
    }
    const options = { new: true };
    const result = await UsersModel.findByIdAndUpdate(
      id,
      updatedUserData,
      options
    );
    res.status(200).send({
      statusCode: 200,
      message: "User updated successfully",
      result,
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

users.delete("/users/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await UsersModel.findOne({ _id: id });
    await deletedUser.deleteOne();
    if (!deletedUser) {
      return res.status(404).send({
        statusCode: 404,
        message: "No user found with the given id",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = users;
