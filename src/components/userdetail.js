"use client";
// import React, { useEffect, useState } from "react";
// import { QueryClient, QueryClientProvider, useQuery } from "react-query";
// import {
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Typography,
// } from "@mui/material";

// const UserDetails = ({ token, userId }) => {
//   const fetchUser = async () => {
//     const url = `https://liveload-api.vercel.app/api/v1/users/${userId}`;

//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     return response.json();
//   };

//   const { data, isLoading, error } = useQuery(["user", userId], fetchUser);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Email</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           <TableRow key={data._id}>
//             <TableCell>{data._id}</TableCell>
//             <TableCell>{data.name}</TableCell>
//             <TableCell>{data.email}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// const UserDetailsWrapper = () => {
//   const [userId, setUserId] = useState(null);
//   const [token, setToken] = useState(null);
//   const queryClient = new QueryClient();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const storedToken = localStorage.getItem("token");
//       if (!storedToken) {
//         console.error("Token not found in local storage");
//         return;
//       }
//       setToken(storedToken);

//       const url =
//         "https://liveload-api.vercel.app/api/v1/users?pageNo=1&pageSize=10&type=individual&role=user&sortBy=createdAt&sortDir=desc&fields=name,mobile,email,status,businessApprovalStatus";

//       const response = await fetch(url, {
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();
//       if (result.status && result.result && result.result.data.length > 0) {
//         const firstUserId = result.result.data[0]._id; // Assuming you want the first user's ID
//         setUserId(firstUserId);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (!token) {
//     return <p>No token found in local storage</p>;
//   }

//   return (
//     <QueryClientProvider client={queryClient}>
//       {userId ? (
//         <UserDetails token={token} userId={userId} />
//       ) : (
//         <p>Loading user...</p>
//       )}
//     </QueryClientProvider>
//   );
// };

// export default UserDetailsWrapper;

// UserDetails.js

// UserDetails.js

// UserDetails.js

// import React, { useEffect, useState } from "react";
// import { useQuery, QueryClient, QueryClientProvider } from "react-query";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import { useRouter } from "next/navigation";

// const UserDetails = () => {
//   const [token, setToken] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchTokenAndUserId = async () => {
//       const storedToken = localStorage.getItem("token");
//       if (storedToken) {
//         setToken(storedToken);
//       } else {
//         console.error("Token not found in local storage");
//         return;
//       }

//       // Ensure router.query.userId is defined before setting userId
//       if (router.query && router.query.userId) {
//         setUserId(router.query.userId);
//       } else {
//         console.error("userId not found in query parameter");
//       }
//     };

//     // Call fetchTokenAndUserId only if router.query is defined and contains userId
//     if (router.query && router.query.userId) {
//       fetchTokenAndUserId();
//     }
//   }, [router.query]);

//   // Handle cases where userId or token is not yet available
//   if (!token || !userId) {
//     return <p>Loading...</p>; // Or handle the loading state until token and userId are fetched
//   }

//   const queryClient = new QueryClient();

//   const fetchUser = async () => {
//     const url = `https://liveload-api.vercel.app/api/v1/users/${userId}`;

//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     return response.json();
//   };

//   const { data, isLoading, error } = useQuery(["user", userId], fetchUser);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow key={data._id}>
//               <TableCell>{data._id}</TableCell>
//               <TableCell>{data.name}</TableCell>
//               <TableCell>{data.email}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </QueryClientProvider>
//   );
// };

// export default UserDetails;
// import React, { useEffect, useState } from "react";
// import { useQuery, QueryClient, QueryClientProvider } from "react-query";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import { useRouter } from "next/navigation";

// const UserDetails = () => {
//   const [token, setToken] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchTokenAndUserId = async () => {
//       const storedToken = localStorage.getItem("token");
//       if (storedToken) {
//         setToken(storedToken);
//       } else {
//         console.error("Token not found in local storage");
//         return;
//       }

//       // Extract userId from router query parameters
//       const { userId } = router.query;
//       if (userId) {
//         setUserId(userId);
//       } else {
//         console.error("userId not found in query parameter");
//       }
//     };

//     fetchTokenAndUserId();
//   }, [router.query]);

//   // Handle cases where userId or token is not yet available
//   if (!token || !userId) {
//     return <p>Loading...</p>; // Or handle the loading state until token and userId are fetched
//   }

//   const queryClient = new QueryClient();

//   const fetchUser = async () => {
//     const url = `https://liveload-api.vercel.app/api/v1/users/${userId}`;

//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     return response.json();
//   };

//   const { data, isLoading, error } = useQuery(["user", userId], fetchUser);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   // Handle case where data is null or undefined (optional, based on API behavior)
//   if (!data) return <p>No data found for userId: {userId}</p>;

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow key={data._id}>
//               <TableCell>{data._id}</TableCell>
//               <TableCell>{data.name}</TableCell>
//               <TableCell>{data.email}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </QueryClientProvider>
//   );
// };

// export default UserDetails;

import React, { useEffect, useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const UserDetails = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // console.log("test", router.query.userId);
    console.log("test1", pathname);
    const fetchTokenAndUserId = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        console.error("Token not found in local storage");
        return;
      }

      if (router.query && router.query.userId) {
        setUserId(router.query.userId);
      } else {
        console.error("userId not found in query parameter");
      }
    };

    fetchTokenAndUserId();
  }, [router.query]);

  if (!token || !userId) {
    return <p>Loading...</p>;
  }

  const queryClient = new QueryClient();

  const fetchUser = async () => {
    const url = `https://liveload-api.vercel.app/api/v1/users/${userId}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { data, isLoading, error } = useQuery(["user", userId], fetchUser);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) return <p>No data found for userId: {userId}</p>;

  return (
    <QueryClientProvider client={queryClient}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={data._id}>
              <TableCell>{data._id}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </QueryClientProvider>
  );
};

export default UserDetails;
