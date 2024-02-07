const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendNewPasswordByEmail = async(email, newPassword) =>{
  try {
    const msg = {
      to: email,
      from: 'petro.shutak.ua@gmail.com', 
      subject: 'Новий пароль. СтЕМ. Сантехніка твого міста',
      text: `Твій новий пароль: ${newPassword}`,
    };

    await sgMail.send(msg);

    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

module.exports = {
  sendNewPasswordByEmail,
};