// src/lib/auth.ts
import api from "./axios";

export const loginRequest = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const registerRequest = async (fullName: string, email: string, password: string) => {
  const { data } = await api.post("/auth/register", { fullName, email, password });
  return data;
};
