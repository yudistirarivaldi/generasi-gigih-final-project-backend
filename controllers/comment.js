const Comment = require("../models/Comment");
const VideoThumbnail = require("../models/VideoThumbnail");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = {
  createComment: async (req, res) => {
    try {
      const { comment, videoId } = req.body;

      const schema = {
        comment: "string|empty:false",
        videoId: "string|empty:false",
      };

      const { username } = req.loggedUser;

      const validate = v.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }

      const video = await VideoThumbnail.findById(videoId);
      if (!video) {
        return res.status(404).json({ error: "Data video not found" });
      }

      const newComment = await Comment.create({
        comment,
        VideoThumbnail: video._id,
        username: username,
      });

      res.status(201).json({
        status: "success",
        message: "Successfully create data comment",
        data: newComment,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving comment data." });
    }
  },
};
