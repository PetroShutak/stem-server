const { Product } = require("../../models/product");

// Отримання всіх продуктів
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Помилка при отриманні продуктів:', error);
    res.status(500).json({ error: 'Помилка сервера при отриманні продуктів' });
  }
};

// Отримання конкретного продукту за його ID
const getProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Продукт не знайдено' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Помилка при отриманні продукту за ID:', error);
    res.status(500).json({ error: 'Помилка сервера при отриманні продукту за ID' });
  }
};

module.exports = { getAllProducts, getProductById };
