const express = require("express");
const router = express.Router();
const { addProduct } = require("../../controllers/products/addProduct");
const { updateProduct } = require("../../controllers/products/updateProduct");

const {
  getProductById,
  getAllProducts,
} = require("../../controllers/products/getProducts");

// Отримання всіх продуктів
router.get("/", getAllProducts);

// Отримання конкретного продукту за його ID
router.get("/:productId", getProductById);

// Роут для додавання продукту
router.post("/", addProduct);
// Роут для оновлення продукту
router.patch("/:productId", updateProduct);

module.exports = router;
