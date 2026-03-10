import api from "@/lib/api";

const saveSettings = async () => {
  try {
    await api.put("/api/admin/settings", {
      uploadLimit,
      emailNotifications,
      maintenanceMode,
      autoLogout,
    });

    alert("Settings saved");
  } catch (error) {
    alert("Failed to save settings");
  }
};
