import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://liveload-api.vercel.app/api/v1/",
});

const fetchUsers = async ({
  page = 1,
  pageSize = 10,
  type = "individual",
  role = "user",
  sortBy = "createdAt",
  sortDir = "desc",
  fields = "name,mobile,email,status",
  token,
  keyword,
}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let endpoint = `users?pageNo=${page}&pageSize=${pageSize}&type=${type}&role=${role}&sortBy=${sortBy}&sortDir=${sortDir}&fields=${fields}`;

  if (keyword) {
    endpoint += `&keyword=${keyword}`;
  }

  try {
    const response = await axiosInstance.get(endpoint, config);
    return response.data.result;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export { fetchUsers };
