import envConfig from "@/src/config/envConfig";
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

export default AxiosInstance;
