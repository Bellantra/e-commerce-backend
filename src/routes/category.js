const express = require("express");
const router = express.Router();
const category = require("../controller/category");

router.get("/", category.getAllCategories);
// router.get("/:id", category.getCategoryById);
router.post("/", category.addCategory);
// router.put("/:id", category.editCategory);
// router.delete("/:id", category.deleteCategory);

module.exports = router;
