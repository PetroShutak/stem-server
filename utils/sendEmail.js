const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "petro.shutak.ua@gmail.com" };
  await sgMail.send(email);
  console.log("Email sent");
  return true;
};

module.exports = sendEmail;

// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

// const { SENDGRID_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_KEY);
// const msg = {
//   to: "nadia.shutak@gmail.com", // Change to your recipient
//   from: "petro.shutak.ua@gmail.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "this is final homevork of course Node.js",
//   html: "<strong>this is final homevork of course Node.js</strong>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });
