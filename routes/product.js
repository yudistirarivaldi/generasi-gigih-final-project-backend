var express = require("express");
var router = express.Router();
const productController = require("../controllers/product");
const { authentication, authorization } = require("../middlewares/auth");

router.use(authentication);

router.get("/", productController.getProduct);
router.get("/:id", productController.getByIDProduct);
// router.use(authorization(["admin"]));

router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
