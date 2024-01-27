const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendOrder = async (data) => {
  const { name, phone, payment, delivery, deliveryAddress, postOffice, cartItems, totalPrice } = data;
  //   console.log('Received order data:', data);

  let deliveryInfo = "";
  if (delivery === "courier") {
    deliveryInfo = `Delivery Method: Courier\nDelivery Address: ${deliveryAddress}`;
  } else if (delivery === "post") {
    deliveryInfo = `Delivery Method: Nova Poshta\nDelivery Address: ${deliveryAddress}\nPost Office: ${postOffice}`;
  }

  const cartItemsTable = `
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
      </tr>
      ${cartItems
        .map(
          (item) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.price}</td>
          </tr>`
        )
        .join("\n")}
    </table>
  `;
  
  const msg = {
    to: "petro.shutak.ua@gmail.com",
    from: "petro.shutak.ua@gmail.com",
    subject: "New Order",
    text: `New order received!\nName: ${name}\nPhone: ${phone}\nPayment Method: ${payment}\n${deliveryInfo}`,
    html: `<strong>New order received!</strong>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Payment Method:</strong> ${payment}</p>
        <p><strong>${deliveryInfo}</strong></p>
        <p><strong>Cart Items:</strong></p>
        ${cartItemsTable}
        <p><strong>Total Price:</strong> ${totalPrice}</p>
        `,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendOrder;
