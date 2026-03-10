import User from "../models/User.js";
import Prediction from "../models/Prediction.js";

/* =====================================================
   ADMIN OVERVIEW (Dashboard Cards)
===================================================== */
export const adminOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalScans = await Prediction.countDocuments();

    const positiveCases = await Prediction.countDocuments({
      prediction: "Glaucoma",
    });

    const detectionRate =
      totalScans === 0 ? 0 : ((positiveCases / totalScans) * 100).toFixed(2);

    res.json({
      totalUsers,
      totalScans,
      positiveCases,
      detectionRate,
    });
  } catch (error) {
    console.error("ADMIN OVERVIEW ERROR:", error);
    res.status(500).json({ message: "Failed to load overview" });
  }
};

/* =====================================================
   USERS LIST (Admin → Users Page)
===================================================== */
export const allUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -refreshToken");

    const usersWithScans = await Promise.all(
      users.map(async (user) => {
        const scans = await Prediction.countDocuments({
          userId: user._id,
        });

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || "User",
          scans,
          status: user.isVerified ? "Active" : "Inactive",
          joined: user.createdAt,
        };
      }),
    );

    res.json(usersWithScans);
  } catch (error) {
    console.error("ADMIN USERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* =====================================================
   ALL IMAGES / SCANS (Admin → Images Page)
===================================================== */
export const allPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    const formatted = predictions.map((p) => ({
      _id: p._id,
      filename: p.imagePath.split("\\").pop(),
      uploadedBy: p.userId?.name || "Unknown",
      size: "N/A", // optional (requires fs to calculate)
      result: p.prediction,
      confidence: Math.round(p.confidence * 100),
      date: p.createdAt,
      imagePath: p.imagePath,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("ADMIN IMAGES ERROR:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

/* =====================================================
   ANALYTICS (Admin → Analytics Page)
===================================================== */
export const analytics = async (req, res) => {
  try {
    // Monthly scans
    const monthlyScans = await Prediction.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Detection trend
    const detectionTrend = await Prediction.aggregate([
      {
        $group: {
          _id: "$prediction",
          count: { $sum: 1 },
        },
      },
    ]);

    // Top users
    const topUsers = await Prediction.aggregate([
      {
        $group: {
          _id: "$userId",
          scans: { $sum: 1 },
          detected: {
            $sum: {
              $cond: [{ $eq: ["$prediction", "Glaucoma"] }, 1, 0],
            },
          },
        },
      },
      { $sort: { scans: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          name: "$user.name",
          scans: 1,
          detected: 1,
        },
      },
    ]);

    res.json({
      monthlyScans,
      detectionTrend,
      topUsers,
    });
  } catch (error) {
    console.error("ADMIN ANALYTICS ERROR:", error);
    res.status(500).json({ message: "Failed to load analytics" });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = !user.isVerified;

    await user.save();

    res.json({
      message: "User status updated",
      status: user.isVerified ? "Active" : "Disabled",
    });
  } catch (error) {
    console.error("TOGGLE USER ERROR:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

/* =====================================================
   ADMIN ACTIVITY LOGS
===================================================== */
export const activityLogs = async (req, res) => {
  try {
    const logs = await Prediction.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .limit(20);

    const formatted = logs.map((log) => ({
      _id: log._id,
      user: log.userId?.name || "System",
      action: "Uploaded retinal scan",
      time: log.createdAt,
      type: log.prediction === "Glaucoma" ? "Warning" : "Success",
    }));

    res.json(formatted);
  } catch (error) {
    console.error("ACTIVITY LOG ERROR:", error);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};
