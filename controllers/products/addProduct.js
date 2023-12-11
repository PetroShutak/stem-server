const { Product } = require("../../models/product");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      model,
      description,
      price,
      category,
      subcategory,
      image,
      raiting,
      country,
    } = req.body;
    console.log(req.body);

    const newProduct = new Product({
      name,
      brand,
      model,
      description,
      price,
      category,
      subcategory,
      image,
      raiting,
      country,
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
