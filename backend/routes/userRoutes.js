import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import {
  userDashboard,
  recentAnalysis,
  reports,
  profile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, roleMiddleware("user"), userDashboard);
router.get("/recent", authMiddleware, roleMiddleware("user"), recentAnalysis);
router.get("/reports", authMiddleware, roleMiddleware("user"), reports);
router.get("/profile", authMiddleware, profile);

export default router;
