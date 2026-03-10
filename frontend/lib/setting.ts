import api from "./api";

export const updateSettings = async (
  uploadLimit: number,
  emailNotifications: boolean,
  maintenanceMode: boolean,
  autoLogout: number,
) => {
  return api.put("/api/admin/settings", {
    uploadLimit,
    emailNotifications,
    maintenanceMode,
    autoLogout,
  });
};
