var express = require("express");
var router = express.Router();
const videoThumbnailController = require("../controllers/videoThumbnail");
const { authentication } = require("../middlewares/auth");

router.use(authentication);

router.get("/", videoThumbnailController.getVideoThumbnail);
router.get("/:id", videoThumbnailController.getByIDVideoThumbnail);

// router.use(authorization(["admin"]));
router.post("/", videoThumbnailController.createVideoThumbnail);
router.put("/:id", videoThumbnailController.updateVideoThumbnail);
router.delete("/:id", videoThumbnailController.deleteVideoThumbnail);

module.exports = router;
