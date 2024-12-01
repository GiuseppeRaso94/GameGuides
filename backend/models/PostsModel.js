const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "usersModel" },
    img: { type: String, required: true },
    description: { type: String, required: true },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "commentsModel",
      },
    ],
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("postsModel", PostSchema, "posts");
