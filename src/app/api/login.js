import axios from "axios";

export const login = async (formData) => {
  try {
    const response = await axios.post(
      "https://liveload-api.vercel.app/api/v1/login",
      formData
    );
    const token = response.data.result.session.token;
    localStorage.setItem("token", token);
    return response.data.result;
  } catch (error) {
    throw error;
  }
};
