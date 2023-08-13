const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { signToken } = require("../helpers/jwt");
const validator = require("validator");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json("User already exist");
      }

  

      if (!username || !email || !password) {
        return res.status(400).json("All field required");
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json("Email must be a valid email");
      }

      let hashPassword = bcrypt.hashSync(password, 8);

      const createUser = await User.create({
        username,
        email,
        password: hashPassword,
      });


      const token = signToken({
        id: createUser._id,
        role: createUser.role,
        username: createUser.username,
        email: createUser.email,
      });

      res.status(201).json({
        status: "success",
        message: "Successfully register",
        data: createUser,
        accessToken: token,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving register." });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json("All field required");
      }

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json("user not found");
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json("Email must be a valid email");
      }

      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return res.status(400).json("wrong password");
      }

      const token = signToken({
        id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
      });

      res.status(200).json({
        status: "success",
        message: "Successfully login",
        username: user.username,
        accessToken: token,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving login." });
      console.log(error);
    }
  },

  getAll: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
      const totalUser = await User.countDocuments();

      const totalPages = Math.ceil(totalUser / limit);

      const currentPages = Math.min(Math.max(1, page), totalPages);

      const skip = (currentPages - 1) * limit;

      const gettAlluser = await User.find()
        .select("_id username email role")
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        status: "success",
        message: "Successfully get data user",
        data: gettAlluser,
        currentPages,
        totalPages,
        totalUser,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving product data." });
    }
  },
};
