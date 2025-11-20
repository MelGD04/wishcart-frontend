// src/lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // URL de tu backend NestJS
  withCredentials: false,
});

export default api;
