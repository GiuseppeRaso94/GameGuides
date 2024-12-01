const express = require("express");
const PostsModel = require("../models/PostsModel");
const UsersModel = require("../models/UsersModel");
const CommentsModel = require("../models/CommentsModel");
const posts = express.Router();

posts.get("/posts", async (request, response, next) => {
  try {
    const posts = await PostsModel.find().populate("user comments");
    if (posts.length === 0) {
      return response.status(404).send({ message: "No posts found" });
    }
    response.status(200).send({ statusCode: 200, posts });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

posts.get("/posts/:id", async (request, response, next) => {
  try {
    const post = await PostsModel.findById(request.params.id).populate(
      "user comments"
    );
    if (!post) {
      return response.status(404).send({ message: "Post not found" });
    }
    response.status(200).send({ statusCode: 200, post });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

posts.post("/posts/create", async (request, response, next) => {
  const newPost = new PostsModel(request.body);
  try {
    const userToUpdate = await UsersModel.findById(request.body.user);
    if (!userToUpdate) {
      return response
        .status(404)
        .send({ statusCode: 404, message: "User not found" });
    }
    const postToSave = await newPost.save();
    await UsersModel.updateOne(
      { _id: userToUpdate },
      { $push: { posts: postToSave } }
    );
    response
      .status(201)
      .send({ statusCode: 201, message: "Post saved succesfully", postToSave });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

posts.patch("/posts/update/:id", async (request, response, next) => {
  const { id } = request.params;
  const updatedPostData = request.body;
  try {
    const postExist = await PostsModel.findById(id);
    if (!postExist) {
      return response.status(404).send({
        statusCode: 404,
        message: "No post found with the given id",
      });
    }
    const options = { new: true };
    const result = await PostsModel.findByIdAndUpdate(
      id,
      updatedPostData,
      options
    );
    response.status(200).send({
      statusCode: 200,
      message: "Post updated successfully",
      result,
    });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

posts.delete("/posts/delete/:id", async (request, response, next) => {
  const { id } = request.params;
  const { user } = request.body;
  try {
    const deletedPost = await PostsModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return response.status(404).send({
        statusCode: 404,
        message: "No post found with the given id",
      });
    }
    if (!user) {
      return response.status(404).send({
        statusCode: 404,
        message: "No user was specified in the request or was not found",
      });
    } else {
      await UsersModel.updateOne({ _id: user }, { $pull: { posts: id } });
    }
    await CommentsModel.deleteMany({ _id: { $in: deletedPost.comments } });
    response.status(200).send({
      statusCode: 200,
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

module.exports = posts;
