const Product = require("../model/product");
const Category = require("../model/category");
const products = require("../data/products.json");
const generateRating = require("../helpers/generateRating");

const seedProducts = async () => {
  for (const product of products) {
    let category = await Category.findOne({
      name: product.category,
    });

    if (!category) {
      category = await Category.create({
        name: product.category,
      });
    }

    if (!product.rating) {
      product.rating = generateRating();
    }

    await Product.create({
      title: product.title,
      description: product.description,
      price: product.price,
      category: category._id,
      rating: product.rating,
      image: product.image,
    });
  }

  console.log("Products seeded successfully");
};

module.exports = seedProducts;
