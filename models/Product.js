const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    linkProduct: {
      type: String,
      required: [true, "Required"],
    },
    title: {
      type: String,
      required: [true, "Required"],
    },
    price: {
      type: Number,
      required: [true, "Required"],
    },
    VideoThumbnail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VideoThumbnail",
    },
  },
  { timestamps: true, unique: true }
);

module.exports = mongoose.model("Product", productSchema);
