const { User } = require("../../models/user");
const { HttpError } = require("../../utils");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw HttpError(404, "User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    const htmlMessage = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 20px;
        }
  
        h1 {
          color: green;
        }
  
        p {
          margin: 20px 0;
        }
  
        a {
          display: inline-block;
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <h1>Ваша пошта успішно підтверджена!</h1>
      <p>Тепер ви можете увійти на сайт за допомогою свого акаунту.</p>
      <a href="https://petroshutak.github.io/StEM/">Перейти на сайт</a>
    </body>
  </html>
  
    `;

    res.send(htmlMessage);
  } catch (error) {
    console.error("Verification error:", error);
    res.status(error.status || 500).json({
      status: "error",
      code: error.status || 500,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = verifyEmail;
