const express = require("express");
const CommentsModel = require("../models/CommentsModel");
const PostsModel = require("../models/PostsModel");
const UsersModel = require("../models/UsersModel");
const comments = express.Router();

comments.get("/comments", async (req, res, next) => {
  try {
    const comments = await CommentsModel.find()
      .sort({ createdAt: 1 })
      .limit(10)
      .populate("user comments");
    if (comments.length === 0) {
      return res.status(404).send({ message: "No comments found" });
    }
    res.status(200).send({ statusCode: 200, comments });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

comments.get("/comments/:id", async (req, res, next) => {
  try {
    const comment = await CommentsModel.findById(req.params.id).populate(
      "user comments"
    );
    if (!comment) {
      return res.status(404).send({ message: "Comment not found" });
    }
    res.status(200).send({ statusCode: 200, comment });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

comments.post("/comments/create", async (req, res, next) => {
  const { user, text, postParent, commentParent } = req.body;
  try {
    const userId = await UsersModel.findById(user);
    const postToUpdate = await PostsModel.findById(postParent);
    const commentToUpdate = await CommentsModel.findById(commentParent);
    const newComment = new CommentsModel({
      user: userId,
      text,
    });
    if (!postToUpdate && !commentToUpdate) {
      return res.status(404).send({
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
    res.status(201).send({
      statusCode: 201,
      message: "Comment saved successfully",
      savedComment,
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

comments.patch("/comments/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const updatedCommentData = req.body;
  try {
    const commentExist = await CommentsModel.findById(id);
    if (!commentExist) {
      return res.status(404).send({
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
    res.status(200).send({
      statusCode: 200,
      message: "Comment updated successfully",
      result,
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

comments.delete("/comments/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  const { post, comment } = req.body;
  try {
    const deletedComment = await CommentsModel.findOne({ _id: id });
    await deletedComment.deleteOne();
    if (!deletedComment) {
      return res.status(404).send({
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
    res.status(200).send({
      statusCode: 200,
      message: "Comment deleted successfully",
      deletedComment,
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = comments;
