import axios from "axios";

export const server = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SERVER_DOMAIN
      : "http://localhost:3456/",
  withCredentials: true,
});

server.interceptors.request.use(
  (config) => {
    const authToken = localStorage && (localStorage.getItem("token") ?? null);
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
