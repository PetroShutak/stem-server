const { Product } = require("../../models/product");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, image, favorite } =
      req.body;
    console.log(req.body);

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      subcategory,
      image,
      favorite,
    });
    console.log(newProduct, "newProduct");
    // Збереження нового продукту в базі даних
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Помилка при додаванні продукту:", error);
    res.status(500).json({ error: "Помилка сервера при додаванні" });
    console.log(error);
  }
};

module.exports = { addProduct };
