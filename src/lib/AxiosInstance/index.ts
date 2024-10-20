"use server";

import axios from "axios";
import { cookies } from "next/headers";

import envConfig from "@/src/config/envConfig";
import { getNewAccessToken } from "@/src/services/authService";

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

AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      const res = await getNewAccessToken();
      const accessToken = res.data.accessToken;

      config.headers["Authorization"] = accessToken;
      cookies().set("accessToken", accessToken);

      return AxiosInstance(config);
    } else {
      return Promise.reject(error);
    }
  },
);

export default AxiosInstance;
