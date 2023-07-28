const mongoose = require("mongoose");

const videoThumbnailSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    thumbnail: {
      type: String,
      required: [true, "Required"],
    },
    videoUrl: {
      type: String,
      required: [true, "Required"],
    },
   
  },
  { timestamps: true, unique: true }
);

module.exports = mongoose.model("VideoThumbnail", videoThumbnailSchema);
