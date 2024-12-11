const express = require("express");
const PostsModel = require("../models/PostsModel");
const UsersModel = require("../models/UsersModel");
const posts = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const verifyToken = require("../middlewares/verifyToken");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "GAMEGUIDESUPLOADS",
    allowed_formats: ["jpg", "png", "gif", "mp4"],
    format: async (req, file) => "png",
    public_id: (req, file) => file.name,
  },
});

const cloud = multer({ storage: cloudStorage });

posts.post(
  "/posts/upload/cloud",
  cloud.single("img"),
  async (req, res, next) => {
    try {
      res.status(200).json({ img: req.file.path });
    } catch (e) {
      next(e);
    }
  }
);

posts.get("/posts", async (req, res, next) => {
  try {
    const posts = await PostsModel.find()
      .sort({ createdAt: 1 })
      .limit(10)
      .populate("user comments");
    if (posts.length === 0) {
      return res.status(404).send({ message: "No posts found" });
    }
    res.status(200).send({ statusCode: 200, posts });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

posts.get("/posts/:id", async (req, res, next) => {
  try {
    const post = await PostsModel.findById(req.params.id).populate(
      "user comments"
    );
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send({ statusCode: 200, post });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

posts.post("/posts/create", async (req, res, next) => {
  const newPost = new PostsModel(req.body);
  try {
    const userToUpdate = await UsersModel.findById(req.body.user);
    if (!userToUpdate) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "User not found" });
    }
    const postToSave = await newPost.save();
    await UsersModel.updateOne(
      { _id: userToUpdate },
      { $push: { posts: postToSave } }
    );
    res
      .status(201)
      .send({ statusCode: 201, message: "Post saved succesfully", postToSave });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

posts.patch("/posts/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const updatedPostData = req.body;
  try {
    const postExist = await PostsModel.findById(id);
    if (!postExist) {
      return res.status(404).send({
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
    res.status(200).send({
      statusCode: 200,
      message: "Post updated successfully",
      result,
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

posts.delete("/posts/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  const { user } = req.body;
  try {
    const deletedPost = await PostsModel.findOne({ _id: id });
    await deletedPost.deleteOne();
    if (!deletedPost) {
      return res.status(404).send({
        statusCode: 404,
        message: "No post found with the given id",
      });
    }
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "No user was specified in the req or was not found",
      });
    } else {
      await UsersModel.updateOne({ _id: user }, { $pull: { posts: id } });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = posts;
