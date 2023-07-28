const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    username: {
      type: String,
      required: [true, "Required"],
    },
    email: {
      type: String,
      required: [true, "Required"],
    },
    password: {
      type: String,
      required: [true, "Required"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true, unique: true }
);

const seedUser = 
  {
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'password'
  }

  const seedDB = async() => {
    await User.ins
  }


module.exports = mongoose.model("User", userSchema);
