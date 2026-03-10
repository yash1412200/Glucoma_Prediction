import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import { predictEye } from "../controllers/predictController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/predict",
  authMiddleware, // JWT from cookies
  upload.single("file"), // MUST be "file"
  predictEye,
);

export default router;
