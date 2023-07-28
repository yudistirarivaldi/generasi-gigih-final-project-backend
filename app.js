require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productRouter = require("./routes/product");
const videoThumbnailRouter = require("./routes/videoThumbnail");
const commentRouter = require("./routes/comment");

require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use("/api/users", usersRouter);
app.use("/api/product", productRouter);
app.use("/api/thumbnail", videoThumbnailRouter);
app.use("/api/comment", commentRouter);

module.exports = app;
