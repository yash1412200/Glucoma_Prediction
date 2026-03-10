import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import predictRoutes from "./routes/predictRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

import { maintenanceCheck } from "./middleware/maintenanceMiddleware.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* CORS */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);

app.use(morgan("dev"));

/* ROUTES */

app.use("/api/auth", authRoutes);

app.use(maintenanceCheck);

app.use("/api", predictRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/settings", settingsRoutes);

/* ROOT */

app.get("/", (req, res) => {
  res.json({ message: "Express backend running" });
});

/* CONNECT DB */

connectDB();

/* START SERVER */

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
