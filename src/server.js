const dotenv = require("dotenv").config();

//app
const app = require("./app");
const connectDB = require("./config/database");

//routes
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");

app.use("/products", productRoute);
app.use("/categories", categoryRoute);

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
