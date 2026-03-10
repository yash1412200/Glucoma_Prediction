import api from "./api";

export const loginApi = async (email: string, password: string) => {
  const res = await api.post(
    "/api/auth/login",
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};

export const registerApi = async (
  name: string,
  email: string,
  password: string,
) => {
  const res = await api.post("/api/auth/register", {
    name,
    email,
    password,
  });

  return res.data;
};

export const verifyEmailOtpApi = async (email: string, otp: string) => {
  const res = await api.post("/api/auth/verify-email", {
    email,
    otp,
  });

  return res.data;
};

export const resendOtpApi = async (email: string) => {
  const res = await api.post("/api/auth/forgot-password", {
    email,
  });
  return res.data;
};

//  ADDED — NON BREAKING

export const forgotPasswordApi = async (email: string) => {
  const res = await api.post("/api/auth/forgot-password", {
    email,
  });

  return res.data;
};

export const resetPasswordApi = async (
  email: string,
  otp: string,
  password: string,
) => {
  const res = await api.post("/api/auth/reset-password", {
    email,
    otp,
    password,
  });

  return res.data;
};

export const verifyResetOtpApi = async (email: string, otp: string) => {
  const res = await api.post("/api/auth/verify-reset-otp", {
    email,
    otp,
  });

  return res.data;
};

export const logoutApi = async () => {
  const res = await api.post("/api/auth/logout");
  return res.data;
};
