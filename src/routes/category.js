/**
 * @openapi
 * tags:
 *   - name: Categories
 *     description: Endpoints for managing categories
 */

const express = require("express");
const router = express.Router();
const category = require("../controller/category");

/**
 * @openapi
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     description: Returns all categories stored in the database.
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             example:
 *               - _id: "64f4a4c0f6f5b1b9d4a7d1a1"
 *                 name: "furniture"
 *               - _id: "64f4a4c0f6f5b1b9d4a7d1a2"
 *                 name: "electronics"
 *   post:
 *     tags: [Categories]
 *     summary: Create a category
 *     description: Creates a new category from the name sent in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "furniture"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "64f4a4c0f6f5b1b9d4a7d1a1"
 *               name: "furniture"
 *               createdAt: "2026-08-07T12:00:00.000Z"
 *               updatedAt: "2026-08-07T12:00:00.000Z"
 *       500:
 *         description: Server error
 */
router.get("/", category.getAllCategories);
router.post("/", category.addCategory);

module.exports = router;
