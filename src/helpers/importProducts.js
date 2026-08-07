const Product = require("../model/product");
const findOrCreateCategory = require("./findOrCreateCategory");

const importProducts = async () => {
  try {
    for (const product of products.products) {
      const category = await findOrCreateCategory(product.category);

      await Product.create({
        title: product.title,
        description: product.description,
        price: product.price,
        category: category._id,
        image: product.image,
        rating: product.rating,
      });
    }

    console.log("Products imported successfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports = importProducts;
