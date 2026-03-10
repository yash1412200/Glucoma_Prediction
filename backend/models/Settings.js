import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    uploadLimit: {
      type: Number,
      default: 10,
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    autoLogout: {
      type: Number,
      default: 30,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Settings", settingsSchema);
