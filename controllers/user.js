const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { signToken } = require("../helpers/jwt");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const schema = {
        username: "string|empty:false",
        email: "string|empty:false",
        password: "string|empty:false",
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }

      var hashPassword = bcrypt.hashSync(password, 8);

      const createUser = await User.create({
        username,
        email,
        password: hashPassword,
      });

      res.status(201).json({
        status: "success",
        message: "Successfully register",
        data: createUser,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving register." });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const schema = {
        email: "string|empty:false",
        password: "string|empty:false",
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "email not found" });
      }

      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({ error: "wrong password" });
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
        accessToken: token,
      });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving login." });
    }
  },

  getAll: async (req, res) => {
    try {
      const gettAlluser = await User.find().select("_id username email role");
      res.status(200).json({
        status: "success",
        message: "Successfully Get All User",
        data: gettAlluser,
      });
    } catch (error) {}
  },
};
