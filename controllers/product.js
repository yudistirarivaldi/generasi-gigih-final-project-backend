const Product = require("../models/Product");
const VideoThumbnail = require("../models/VideoThumbnail");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { linkProduct, linkImage, title, price, videoId } = req.body;

      if ((!linkProduct || !linkProduct || !title || !price, !videoId)) {
        return res.status(400).json("All field required");
      }

      const video = await VideoThumbnail.findById(videoId);
      if (!video) {
        return res.status(404).json({ error: "Data video not found" });
      }

      const newProduct = await Product.create({
        linkProduct,
        linkImage,
        title,
        price,
        VideoThumbnail: video._id,
      });

      res.status(201).json({
        status: "success",
        message: "Successfully create data video thumbnail",
        data: newProduct,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving product data." });
    }
  },

  getProduct: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
      const totalProducts = await Product.countDocuments();

      const totalPages = Math.ceil(totalProducts / limit);

      const currentPages = Math.min(Math.max(1, page), totalPages);

      const skip = (currentPages - 1) * limit;

      const product = await Product.find()

        .select("_id linkProduct linkImage title price")
        .populate("VideoThumbnail", "_id videoUrl")
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        status: "success",
        message: "Successfully get data product",
        data: product,
        currentPages,
        totalPages,
        totalProducts,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving product data." });
    }
  },

  getByIDProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findById(id)
        .select("_id linkProduct title price")
        .populate("VideoThumbnail", "_id videoUrl");
      if (!product) {
        return res.status(404).json({ error: "Products not found." });
      }

      res.status(200).json({
        status: "success",
        message: "Successfully get data product",
        data: product,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving product data." });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { linkProduct, title, price } = req.body;

      const schema = {
        linkProduct: "string|empty:false",
        title: "string|empty:false",
        price: "number|empty:false",
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { linkProduct, title, price },
        {
          new: true, // Mengembalikan data yang sudah diperbarui
        }
      );
      if (!updatedProduct) {
        return res.status(404).json({ error: "Products not found." });
      }

      res.status(201).json({
        status: "success",
        message: "Successfully update data video product",
        data: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving product data." });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ error: "Products not found." });
      }

      res.status(200).json({
        status: "success",
        message: "Successfully delete data video product",
        data: deletedProduct,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving product data." });
    }
  },
};
