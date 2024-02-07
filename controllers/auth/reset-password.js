const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { sendNewPasswordByEmail } = require("../../utils/sendNewPasswordByEmail");

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found (email not registered)" });
    }

    const newPassword = crypto.randomBytes(8).toString("hex");

    const unhashedPassword = newPassword;
    console.log("unhashedPassword", unhashedPassword);

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();

    sendNewPasswordByEmail(user.email, unhashedPassword);

    return res
      .status(200)
      .json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(422)
      .json({ message: "Unprocessable entity (password reset email failed)" });
  }
};

module.exports = {
  resetPassword,
};
