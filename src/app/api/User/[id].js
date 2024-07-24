export async function fetchUserDetails(token, userId) {
  const url = `https://liveload-api.vercel.app/api/v1/users/${userId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    throw error;
  }
}
