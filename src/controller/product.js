const Product = require("../model/product");

const getAllProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === "desc" ? -1 : 1;

    const products = await Product.find().limit(limit).sort({ _id: sort });

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

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProductCategories = (req, res) => {
  Product.distinct("category")
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => console.log(err));
};

const getProductsInCategory = (req, res) => {
  const category = req.params.category;
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;

  Product.find({
    category,
  })
    .select(["-_id"])
    .limit(limit)
    .sort({ id: sort })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};
const addProduct = async (req, res) => {
  try {
    const { title, price, description, image, category } = req.body;

    console.log("entrooooo");

    const product = new Product({
      title,
      price,
      description,
      image,
      category,
    });

    const savedProduct = await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const addProduct = (req, res) => {
//   if (typeof req.body == undefined) {
//     res.json({
//       status: "error",
//       message: "data is undefined",
//     });
//   } else {
//     // let productCount = 0;
//     // Product.find()
//     //   .countDocuments(function (err, count) {
//     //     productCount = count;
//     //   })
//     //   .then(() => {
//     const product = {
//       id: 21,
//       title: req.body.title,
//       price: req.body.price,
//       description: req.body.description,
//       image: req.body.image,
//       category: req.body.category,
//     };
//     // product.save()
//     //   .then(product => res.json(product))
//     //   .catch(err => console.log(err))
//     res.json(product);
//     // });
//   }
// };

const editProduct = (req, res) => {
  if (typeof req.body == undefined || req.params.id == null) {
    res.json({
      status: "error",
      message: "something went wrong! check your sent data",
    });
  } else {
    res.json({
      id: parseInt(req.params.id),
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
    });
  }
};

const deleteProduct = (req, res) => {
  if (req.params.id == null) {
    res.json({
      status: "error",
      message: "cart id should be provided",
    });
  } else {
    Product.findOne({
      id: req.params.id,
    })
      .select(["-_id"])
      .then((product) => {
        res.json(product);
      })
      .catch((err) => console.log(err));
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
