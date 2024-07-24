import axios from "axios";

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

  let url = `https://liveload-api.vercel.app/api/v1/users?pageNo=${page}&pageSize=${pageSize}&type=${type}&role=${role}&sortBy=${sortBy}&sortDir=${sortDir}&fields=${fields}`;

  if (keyword) {
    url += `&keyword=${keyword}`;
  }

  try {
    const response = await axios.get(url, config);
    return response.data.result;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export { fetchUsers };
