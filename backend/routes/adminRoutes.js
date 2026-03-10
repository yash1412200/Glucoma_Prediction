import express from "express";
import {
  adminOverview,
  allUsers,
  allPredictions,
  analytics,
  toggleUserStatus,
  activityLogs,
} from "../controllers/adminController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware, adminOnly);

router.get("/overview", adminOverview);
router.get("/users", allUsers);
router.get("/predictions", allPredictions);
router.get("/analytics", analytics);
router.get("/activity", activityLogs);
router.patch("/users/:id/status", authMiddleware, adminOnly, toggleUserStatus);

export default router;
