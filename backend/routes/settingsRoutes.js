import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware("admin"), getSettings);
router.put("/", authMiddleware, roleMiddleware("admin"), updateSettings);

export default router;
