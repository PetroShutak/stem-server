// controller getProfile.js:
const getProfile = async (req, res, next) => {
    try {
      // Отримання поточного користувача із req.user (який має прийти з middleware аутентифікації)
      const currentUser = req.user;
  
      // Відправлення відповіді з усіма полями користувача
      res.json(currentUser);
    } catch (error) {
      // Передача помилки до middleware обробки помилок
      next(error);
    }
  };
  
  module.exports = getProfile;
