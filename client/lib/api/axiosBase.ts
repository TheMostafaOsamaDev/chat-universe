import { baseURL } from "@/config";
import axios from "axios";

export const axiosBase = axios.create({
  baseURL,
  withCredentials: true,
});
