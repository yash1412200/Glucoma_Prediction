import api from "./api";

export const predictEyeApi = async (file: File, eye: "left" | "right") => {
  const formData = new FormData();

  // MUST match backend
  formData.append("file", file);
  formData.append("eye", eye);

  const res = await api.post("/api/predict", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
