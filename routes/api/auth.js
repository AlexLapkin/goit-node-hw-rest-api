const express = require("express");

const router = express.Router();

const authControllers = require("../../controllers/auth");

const auth = require("../../middlewares/auth");

const upload = require("../../middlewares/upload");

router.post("/register", authControllers.register);

router.get("/verify/:verificationToken", authControllers.verifyEmail);

router.post("/verify", authControllers.resendVerifyEmail);

router.post("/login", authControllers.login);

router.post("/logout", auth, authControllers.logout);

router.get("/current", auth, authControllers.getCurrent);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  authControllers.updateAvatar
);

module.exports = router;
