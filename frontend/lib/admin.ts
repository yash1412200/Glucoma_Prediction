import api from "./api";

export const getAdminOverviewApi = async () => {
  const res = await api.get("/api/admin/overview");
  return res.data;
};

export const getAdminAnalyticsApi = async () => {
  const res = await api.get("/api/admin/analytics");
  return res.data;
};

export const getAdminUsersApi = async () => {
  const res = await api.get("/api/admin/users");
  return res.data;
};

export const getAdminPredictionsApi = async () => {
  const res = await api.get("/api/admin/predictions");
  return res.data;
};

export const toggleUserStatusApi = async (id: string) => {
  const res = await api.patch(`/api/admin/users/${id}/status`);
  return res.data;
};

export const getAdminActivityApi = async () => {
  const res = await api.get("/api/admin/activity");
  return res.data;
};
