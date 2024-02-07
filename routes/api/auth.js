const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerLoginSchema),
  ctrl.register
);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/login", validateBody(schemas.registerLoginSchema), ctrl.login);

router.post("/forgot-password", ctrl.resetPassword);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/profile", authenticate, ctrl.getProfile);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
