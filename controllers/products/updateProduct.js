const { Product } = require("../../models/product");

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log("productId", productId);

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the product properties based on the request body
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

    existingProduct.name = name || existingProduct.name;
    existingProduct.brand = brand || existingProduct.brand;
    existingProduct.model = model || existingProduct.model;
    existingProduct.description = description || existingProduct.description;
    existingProduct.price = price || existingProduct.price;
    existingProduct.category = category || existingProduct.category;
    existingProduct.subcategory = subcategory || existingProduct.subcategory;
    existingProduct.image = image || existingProduct.image;
    existingProduct.raiting = raiting || existingProduct.raiting;
    existingProduct.country = country || existingProduct.country;

    // Save the updated product in the database
    const updatedProduct = await existingProduct.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error while updating" });
  }
};

module.exports = { updateProduct };
