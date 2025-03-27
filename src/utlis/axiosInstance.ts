import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://url-ten-psi.vercel.app/api",
});
export default axiosInstance;
