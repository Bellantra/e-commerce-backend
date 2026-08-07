/**
 * @openapi
 * tags:
 *   - name: Products
 *     description: Endpoints for managing products
 */

const express = require("express");
const router = express.Router();
const product = require("../controller/product");

/**
 * @openapi
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     description: Returns a list of products with the related category populated and only the category name displayed.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of results to return.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order by id.
 *     responses:
 *       200:
 *         description: Product list
 *         content:
 *           application/json:
 *             example:
 *               - _id: "64f4a4c0f6f5b1b9d4a7d1b1"
 *                 title: "Wooden table"
 *                 price: 120
 *                 description: "Living room table"
 *                 image: "table.jpg"
 *                 category:
 *                   _id: "64f4a4c0f6f5b1b9d4a7d1a1"
 *                   name: "furniture"
 *                 rating: 4.7
 *   post:
 *     tags: [Products]
 *     summary: Create a product
 *     description: Creates a new product. If the category does not exist, it is created automatically and the product stores the category reference by id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Wooden table"
 *             price: 120
 *             description: "Living room table"
 *             image: "table.jpg"
 *             category: "furniture"
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Product created successfully"
 *               data:
 *                 _id: "64f4a4c0f6f5b1b9d4a7d1b1"
 *                 title: "Wooden table"
 *                 price: 120
 *                 description: "Living room table"
 *                 image: "table.jpg"
 *                 category:
 *                   _id: "64f4a4c0f6f5b1b9d4a7d1a1"
 *                   name: "furniture"
 *                 rating: 4.7
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.get("/", product.getAllProducts);

/**
 * @openapi
 * /products/categories:
 *   get:
 *     tags: [Products]
 *     summary: Get category names
 *     description: Returns all available category names.
 *     responses:
 *       200:
 *         description: Category name list
 *         content:
 *           application/json:
 *             example:
 *               - "furniture"
 *               - "electronics"
 */
router.get("/categories", product.getProductCategories);

/**
 * @openapi
 * /products/category/{category}:
 *   get:
 *     tags: [Products]
 *     summary: Get products by category
 *     description: Finds the category by name and returns all products assigned to that category, with the category populated.
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Category name.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Result limit.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Ascending or descending order.
 *     responses:
 *       200:
 *         description: Products in the category
 *       404:
 *         description: Category not found
 */
router.get("/category/:category", product.getProductsInCategory);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get a product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id.
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 *   put:
 *     tags: [Products]
 *     summary: Update a product
 *     description: Updates the product fields. If a new category is sent, it will be created if it does not exist.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "New table"
 *             price: 150
 *             description: "Updated table"
 *             image: "new-table.jpg"
 *             category: "furniture"
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.get("/:id", product.getProductById);
router.post("/", product.addProduct);
router.put("/:id", product.editProduct);
router.patch("/:id", product.editProduct);
router.delete("/:id", product.deleteProduct);

module.exports = router;
