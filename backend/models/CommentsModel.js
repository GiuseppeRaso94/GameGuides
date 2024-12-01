const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "usersModel" },
    text: { type: String, required: true },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "commentsModel",
      },
    ],
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("commentsModel", CommentSchema, "comments");
