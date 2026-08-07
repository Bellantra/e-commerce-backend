const mongoose = require("mongoose");
const seedProducts = require("./seedProducts");
require("dotenv").config();

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    await seedProducts();

    await mongoose.connection.close();

    console.log("Seed completed");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runSeed();
