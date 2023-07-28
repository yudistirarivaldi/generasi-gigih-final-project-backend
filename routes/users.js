const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { authentication } = require("../middlewares/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(authentication);
router.get("/", userController.getAll);

module.exports = router;
