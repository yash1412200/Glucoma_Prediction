import Prediction from "../models/Prediction.js";
import User from "../models/User.js";

export const userDashboard = async (req, res) => {
  const scans = await Prediction.find({ userId: req.user.id });

  const total = scans.length;
  const normal = scans.filter((s) => s.prediction === "Normal").length;
  const detected = scans.filter((s) => s.prediction === "Glaucoma").length;

  res.json({
    totalScans: total,
    normalResults: normal,
    detectedCases: detected,
  });
};

export const recentAnalysis = async (req, res) => {
  const data = await Prediction.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .limit(10);

  res.json(data);
};

export const reports = async (req, res) => {
  const data = await Prediction.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  res.json(data);
};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email role");

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load profile" });
  }
};
