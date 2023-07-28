const VideoThumbnail = require("../models/VideoThumbnail");
const Validator = require("fastest-validator");
const Product = require("../models/Product");
const Comment = require("../models/Comment");

const v = new Validator();

module.exports = {
  getVideoThumbnail: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
      const totalVideo = await VideoThumbnail.countDocuments();

      const totalPages = Math.ceil(totalVideo / limit);

      const currentPages = Math.min(Math.max(1, page), totalPages);

      const skip = (currentPages - 1) * limit;

      const videos = await VideoThumbnail.find()
        .select("_id videoUrl")
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        status: "success",
        message: "Successfully get data videos",
        data: videos,
        currentPages,
        totalPages,
        totalVideo,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving video data." });
    }
  },

  getByIDVideoThumbnail: async (req, res) => {
    try {
      const { id } = req.params;

      const video = await VideoThumbnail.findById(id).select("_id videoUrl");
      if (!video) {
        return res.status(404).json({ error: "Video not found." });
      }

      const products = await Product.find({ VideoThumbnail: id }).select(
        "_id linkProduct title price VideoThumbnail"
      );
      if (!products) {
        return res.status(404).json({ error: "Products not found." });
      }

      const comments = await Comment.find({ VideoThumbnail: id }).select(
        "_id comment VideoThumbnail"
      );
      if (!comments) {
        return res.status(404).json({ error: "Comment not found." });
      }

      res.status(200).json({
        status: "success",
        message: "Successfully get data product",
        data: video,
        products: products,
        comments: comments,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan dalam mengambil data video." });
    }
  },

  createVideoThumbnail: async (req, res) => {
    try {
      const { thumbnail, videoUrl } = req.body;

      const schema = {
        videoUrl: "string|empty:false",
        thumbnail: "string|empty:false",
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }

      const newVideo = await VideoThumbnail.create({
        videoUrl,
        thumbnail
      });

      res.status(201).json({
        status: "success",
        message: "Successfully create data video thumbnail",
        data: newVideo,
      });
    } catch (error) {
       res.status(500).json({ error: "Error retrieving video data." });
    }
  },

  updateVideoThumbnail: async (req, res) => {
    try {
      const { id } = req.params;
      const { videoUrl, thumbnail } = req.body;

      const schema = {
        videoUrl: "string|empty:false",
        thumbnail: "string|empty:false",
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }

      const updatedVideo = await VideoThumbnail.findByIdAndUpdate(
        id,
        { videoUrl, thumbnail },
        {
          new: true,
        }
      );
      if (!updatedVideo) {
        return res.status(404).json({ error: "Videos not found." });
      }

      res.status(201).json({
        status: "success",
        message: "Successfully update data video product",
        data: updatedVideo,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving video data." });
    }
  },

  deleteVideoThumbnail: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedVideo = await VideoThumbnail.findByIdAndDelete(id);
      if (!deletedVideo) {
        return res.status(404).json({ error: "Video not found." });
      }

      res.status(200).json({
        status: "success",
        message: "Successfully delete data video",
        data: deletedVideo,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving video data." });
    }
  },
};
