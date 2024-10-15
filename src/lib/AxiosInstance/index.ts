import axios from "axios";

import envConfig from "@/src/config/envConfig";
import { cookies } from "next/headers";

const AxiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default AxiosInstance;
