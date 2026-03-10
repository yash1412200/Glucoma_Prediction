import Settings from "../models/Settings.js";

export const maintenanceCheck = async (req, res, next) => {
  const settings = await Settings.findOne();

  if (!settings?.maintenanceMode) {
    return next();
  }

  if (req.user?.role === "admin") {
    return next();
  }

  return res.status(503).json({
    message: "System under maintenance",
  });
};
