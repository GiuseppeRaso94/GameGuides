const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");
const loginRoute = require("./routes/login");

mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Db Connection Error"));
db.once("open", () => console.log("Db connected successfully"));

const PORT = process.env.BE_PORT;
const server = express();
server.use(express.json());
server.use(cors());
server.use("/", usersRoute);
server.use("/", postsRoute);
server.use("/", commentsRoute);
// server.use("/", loginRoute);
server.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
