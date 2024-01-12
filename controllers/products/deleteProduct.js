const { Product } = require("../../models/product");

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Remove the product from the database using deleteOne
    await Product.deleteOne({ _id: productId });

    res.status(204).send(); // Видалено успішно
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error while deleting" });
  }
};

module.exports = { deleteProduct };
