import Settings from "../models/Settings.js";

/* GET SETTINGS */
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json(settings);
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);
    res.status(500).json({ message: "Failed to load settings" });
  }
};

/* UPDATE SETTINGS */
export const updateSettings = async (req, res) => {
  try {
    const { uploadLimit, emailNotifications, maintenanceMode, autoLogout } =
      req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        uploadLimit,
        emailNotifications,
        maintenanceMode,
        autoLogout,
      });
    } else {
      settings.uploadLimit = uploadLimit;
      settings.emailNotifications = emailNotifications;
      settings.maintenanceMode = maintenanceMode;
      settings.autoLogout = autoLogout;

      await settings.save();
    }

    res.json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);
    res.status(500).json({ message: "Failed to update settings" });
  }
};
