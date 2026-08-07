const Product = require("../model/product");
const Category = require("../model/category");
const findOrCreateCategory = require("../helpers/findOrCreateCategory");
const generateRating = require("../helpers/generateRating");

const getAllProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === "desc" ? -1 : 1;

    const products = await Product.find()
      .populate("category", "name")
      .limit(limit)
      .sort({ _id: sort });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category", "name");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProductCategories = async (req, res) => {
  try {
    const categories = await Category.find().select("name").sort({ name: 1 });
    res.json(categories.map((category) => category.name));
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProductsInCategory = async (req, res) => {
  try {
    const categoryName = req.params.category;
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === "desc" ? -1 : 1;

    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada",
      });
    }

    let query = Product.find({ category: category._id })
      .populate("category", "name")
      .sort({ _id: sort });

    if (limit > 0) {
      query = query.limit(limit);
    }

    const products = await query;

    return res.json(products);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { title, price, description, image, category } = req.body;

    //TODO Validate required fields provisory
    if (!title || !price || !category || !image || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Empty data required: title, price, description, image and category",
      });
    }

    const categoryDoc = await findOrCreateCategory(category);

    const product = new Product({
      title,
      price,
      description,
      image,
      category: categoryDoc._id,
      rating: generateRating(), //Todo for the moment rating added manually (for the future has to be calculated)
    });

    const savedProduct = await product.save();
    const populatedProduct = await Product.findById(savedProduct._id).populate(
      "category",
      "name",
    );

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: populatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description, image, category } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (title) product.title = title;
    if (price) product.price = price;
    if (description) product.description = description;
    if (image) product.image = image;

    if (category) {
      const categoryDoc = await findOrCreateCategory(category);
      product.category = categoryDoc._id;
    }

    const updatedProduct = await product.save();
    const populatedProduct = await Product.findById(
      updatedProduct._id,
    ).populate("category", "name");

    return res.json({
      success: true,
      data: populatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Product deleted",
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductCategories,
  getProductsInCategory,
  addProduct,
  editProduct,
  deleteProduct,
};
