var express = require("express");
var router = express.Router();
const commentController = require("../controllers/comment");
const { authentication, authorization } = require("../middlewares/auth");

router.use(authentication);
router.use(authorization(["user"]));
router.post("/", commentController.createComment);

module.exports = router;
