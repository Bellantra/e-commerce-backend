const Category = require("../model/category");

const findOrCreateCategory = async (categoryValue) => {
  if (!categoryValue) {
    throw new Error("La categoría es obligatoria");
  }

  const category = await Category.findOne({ name: categoryValue });

  if (category) {
    return category;
  }

  return Category.create({ name: categoryValue });
};

module.exports = findOrCreateCategory;
