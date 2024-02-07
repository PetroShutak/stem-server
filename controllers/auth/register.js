const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../utils");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { BASE_URL } = process.env;
const crypto = require("crypto");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomBytes(16).toString("hex");
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target ="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Клікніть для підтвердження реєстрації</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
    verificationToken: newUser.verificationToken,
  });
};

module.exports = register;
