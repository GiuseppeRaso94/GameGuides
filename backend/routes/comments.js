const express = require("express");
const CommentsModel = require("../models/CommentsModel");
const PostsModel = require("../models/PostsModel");
const UsersModel = require("../models/UsersModel");
const comments = express.Router();

comments.get("/comments", async (request, response, next) => {
  try {
    const comments = await CommentsModel.find().populate("user comments");
    if (comments.length === 0) {
      return response.status(404).send({ message: "No comments found" });
    }
    response.status(200).send({ statusCode: 200, comments });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

comments.get("/comments/:id", async (request, response, next) => {
  try {
    const comment = await CommentsModel.findById(request.params.id).populate(
      "user comments"
    );
    if (!comment) {
      return response.status(404).send({ message: "Comment not found" });
    }
    response.status(200).send({ statusCode: 200, comment });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

comments.post("/comments/create", async (request, response, next) => {
  const { user, text, postParent, commentParent } = request.body;
  try {
    const userId = await UsersModel.findById(user);
    const postToUpdate = await PostsModel.findById(postParent);
    const commentToUpdate = await CommentsModel.findById(commentParent);
    const newComment = new CommentsModel({
      user: userId,
      text,
    });
    if (!postToUpdate && !commentToUpdate) {
      return response.status(404).send({
        statusCode: 404,
        message: "No parent was specified in the request or was not found",
      });
    }
    const savedComment = await newComment.save();
    if (postToUpdate) {
      await PostsModel.updateOne(
        { _id: postToUpdate },
        { $push: { comments: savedComment } }
      );
    } else {
      await CommentsModel.updateOne(
        { _id: commentToUpdate },
        { $push: { comments: savedComment } }
      );
    }
    response.status(201).send({
      statusCode: 201,
      message: "Comment saved successfully",
      savedComment,
    });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

comments.patch("/comments/update/:id", async (request, response, next) => {
  const { id } = request.params;
  const updatedCommentData = request.body;
  try {
    const commentExist = await CommentsModel.findById(id);
    if (!commentExist) {
      return response.status(404).send({
        statusCode: 404,
        message: "No comment found with the given id",
      });
    }
    const options = { new: true };
    const result = await CommentsModel.findByIdAndUpdate(
      id,
      updatedCommentData,
      options
    );
    response.status(200).send({
      statusCode: 200,
      message: "Comment updated successfully",
      result,
    });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

comments.delete("/comments/delete/:id", async (request, response, next) => {
  const { id } = request.params;
  const { post, comment } = request.body;
  try {
    const deletedComment = await CommentsModel.findByIdAndDelete(id);
    if (!deletedComment) {
      return response.status(404).send({
        statusCode: 404,
        message: "No comment found with the given id",
      });
    }
    if (post) {
      await PostsModel.updateOne({ _id: post }, { $pull: { comments: id } });
    } else {
      await CommentsModel.updateOne(
        { _id: comment },
        { $pull: { comments: id } }
      );
    }
    response.status(200).send({
      statusCode: 200,
      message: "Comment deleted successfully",
      deletedComment,
    });
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

module.exports = comments;
