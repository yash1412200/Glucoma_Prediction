import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendOtpEmail } from "../utils/sendEmail.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

/* ---------------- REGISTER ---------------- */

export const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    email = email.trim().toLowerCase();
    password = password.trim();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (!existingUser.isVerified) {
        const otp = generateOtp();

        await Otp.deleteMany({ email });

        await Otp.create({
          email,
          otp,
          expiresAt: Date.now() + 5 * 60 * 1000,
        });

        await sendOtpEmail(email, otp);

        return res.status(200).json({
          message: "Email already registered. OTP resent.",
        });
      }

      return res.status(400).json({
        message: "Email already registered. Please login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    const otp = generateOtp();

    await Otp.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendOtpEmail(email, otp);

    return res.status(201).json({
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Registration failed",
    });
  }
};

/* ---------------- VERIFY EMAIL OTP ---------------- */

export const verifyEmailOtp = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const { otp } = req.body;

    const record = await Otp.findOne({ email, otp });

    if (!record || record.expiresAt < Date.now()) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    await User.findOneAndUpdate({ email }, { isVerified: true });

    await Otp.deleteMany({ email });

    return res.json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    return res.status(500).json({
      message: "OTP verification failed",
    });
  }
};

/* ---------------- LOGIN ---------------- */

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();
    password = password.trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify your email first",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        message: "Login successful",
      });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Login failed",
    });
  }
};

/* ---------------- FORGOT PASSWORD ---------------- */

export const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = generateOtp();

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendOtpEmail(email, otp);

    return res.json({
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return res.status(500).json({
      message: "Failed to send OTP",
    });
  }
};

/* ---------------- VERIFY RESET OTP ---------------- */

export const verifyResetOtp = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const { otp } = req.body;

    const record = await Otp.findOne({ email, otp });

    if (!record || record.expiresAt < Date.now()) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    return res.json({
      message: "Reset OTP verified",
    });
  } catch (error) {
    return res.status(500).json({
      message: "OTP verification failed",
    });
  }
};

/* ---------------- RESET PASSWORD ---------------- */

export const resetPassword = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const { password, otp } = req.body;

    const record = await Otp.findOne({ email, otp });

    if (!record || record.expiresAt < Date.now()) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    await Otp.deleteMany({ email });

    return res.json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return res.status(500).json({
      message: "Password reset failed",
    });
  }
};

/* ---------------- LOGOUT ---------------- */

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await User.findOne({ refreshToken });

      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

    return res.json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return res.status(500).json({
      message: "Logout failed",
    });
  }
};
