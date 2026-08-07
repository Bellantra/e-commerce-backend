const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce Backend API",
      version: "1.0.0",
      description:
        "API documentation for the e-commerce products and categories endpoints. It explains how to create, list, edit, delete, and filter products and categories.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    tags: [
      {
        name: "Products",
        description: "Product operations",
      },
      {
        name: "Categories",
        description: "Category operations",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controller/*.js", "./src/model/*.js"],
};

module.exports = swaggerJsdoc(options);
