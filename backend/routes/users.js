const express = require("express");
const UsersModel = require("../models/UsersModel");
const PostsModel = require("../models/PostsModel");
const users = express.Router();

users.get("/users", async (request, response, next) => {
  try {
    const users = await UsersModel.find().populate("posts");
    if (users.length === 0) {
      return response.status(404).send({ message: "No users found" });
    }
    response.status(200).send({ statusCode: 200, users });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

users.get("/users/:id", async (request, response, next) => {
  try {
    const user = await UsersModel.findById(request.params.id).populate("posts");
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }
    response.status(200).send({ statusCode: 200, user });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

users.post("/users/create", async (request, response, next) => {
  const newUser = new UsersModel(request.body);
  try {
    const userToSave = await newUser.save();
    response
      .status(201)
      .send({ statusCode: 201, message: "User saved succesfully", userToSave });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

users.patch("/users/update/:id", async (request, response, next) => {
  const { id } = request.params;
  const updatedUserData = request.body;
  try {
    const userExist = await UsersModel.findById(id);
    if (!userExist) {
      return response.status(404).send({
        statusCode: 404,
        message: "No user found with the given id",
      });
    }
    const options = { new: true };
    const result = await UsersModel.findByIdAndUpdate(
      id,
      updatedUserData,
      options
    );
    response.status(200).send({
      statusCode: 200,
      message: "User updated successfully",
      result,
    });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

users.delete("/users/delete/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    const deletedUser = await UsersModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return response.status(404).send({
        statusCode: 404,
        message: "No user found with the given id",
      });
    }
    await PostsModel.deleteMany({ _id: { $in: deletedUser.posts } });
    response.status(200).send({
      statusCode: 200,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

module.exports = users;
