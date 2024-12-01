const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: false,
    },
    isActive: { type: Boolean, required: false, default: true },
    dob: { type: Date, required: false },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "postsModel",
      },
    ],
  },
  {
    timestamps: true,
    strict: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (e) {
    next(e);
  }
});

module.exports = mongoose.model("usersModel", UserSchema, "users");
