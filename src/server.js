const dotenv = require("dotenv").config();

//app
const app = require("./app");
const connectDB = require("./config/database");

//routes
const productRoute = require("./routes/product");

app.use("/products", productRoute);

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
