const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    username: {
      type: String,
      required: [true, "Required"],
    },
    comment: {
      type: String,
      required: [true, "Required"],
    },
    VideoThumbnail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VideoThumbnail",
    },
  },
  { timestamps: true, unique: true }
);

module.exports = mongoose.model("Comment", commentSchema);
