import api from "./api";

export const getDashboardStatsApi = async () => {
  const res = await api.get("/api/user/dashboard");
  return res.data;
};

export const getRecentAnalysisApi = async () => {
  const res = await api.get("/api/user/recent");
  return res.data;
};

export const getReportsApi = async () => {
  const res = await api.get("/api/user/reports");
  return res.data;
};

export const getProfileApi = async () => {
  const res = await api.get("/api/user/profile");
  return res.data;
};
