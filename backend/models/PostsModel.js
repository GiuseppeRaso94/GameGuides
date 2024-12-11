const mongoose = require("mongoose");
const CommentsModel = require("./CommentsModel");
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

PostSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      this.comments.forEach((comment) => {
        CommentsModel.findOne({ _id: comment.toString() }).then((comment) => {
          comment.deleteOne({ _id: comment }).then();
        });
      });
      next();
    } catch (e) {
      next(e);
    }
  }
);

module.exports = mongoose.model("postsModel", PostSchema, "posts");
