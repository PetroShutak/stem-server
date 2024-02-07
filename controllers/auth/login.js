const { User } = require("../../models/user");
const { HttpError } = require("../../utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Пошта або пароль введені невірно");
  }
  
  if (!user.verify) {
    throw HttpError(401, "Пошта не підтверджена");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Пошта або пароль введені невірно");
  }

  const filteredUser = {
    email: user.email,
    name: user.name,
  };

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token, user: filteredUser });
};

module.exports = login;
