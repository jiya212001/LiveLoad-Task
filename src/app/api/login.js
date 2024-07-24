import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://liveload-api.vercel.app/api/v1",
});

export const login = async (formData) => {
  try {
    const response = await axiosInstance.post("/login", formData);
    const token = response.data.result.session.token;
    localStorage.setItem("token", token);
    return response.data.result;
  } catch (error) {
    throw error;
  }
};
