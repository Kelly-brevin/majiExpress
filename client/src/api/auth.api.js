import api from "./axios";

export const userLogin = (data) => api.post("/auth/login", data);
export const userRegister = (data) => api.post("/auth/register", data);
export const adminLogin = (data) => api.post("/admin/login", data);
