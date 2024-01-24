const sendOrder = require("../../utils/sendOrder");

const placeOrder = async (req, res) => {
  try {
    // Отримати дані з запиту (ім'я, кількість, адреса, спосіб доставки)
    const { name, quantity, address, deliveryMethod } = req.body;

    // Викликати функцію для відправки замовлення
    await sendOrder({ name, quantity, address, deliveryMethod });

    // Відповісти на клієнта
    res.status(200).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { placeOrder };
