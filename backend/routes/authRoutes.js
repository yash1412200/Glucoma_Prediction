import express from "express";
import {
  register,
  verifyEmailOtp,
  login,
  forgotPassword,
  resetPassword,
  verifyResetOtp,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmailOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/logout", logout);

export default router;
