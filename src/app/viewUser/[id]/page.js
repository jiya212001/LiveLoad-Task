//   return (
//     <>
//       <PersistentDrawerLeft />
//       <Typography
//         variant="h5"
//         component="div"
//         sx={{
//           fontSize: "clamp(0.875)",
//           lineHeight: 1.57,
//           fontFamily: "sans-serif",
//           fontWeight: 600,
//           color: "#262626",
//           cursor: "pointer",
//           position: "absolute",
//           top: "120px",
//           left: "250px",
//           maxWidth: "90vw",
//           textAlign: "center",
//         }}
//       >
//         Edit Individual User
//       </Typography>
//     </>
//   );

"use client";

import PersistentDrawerLeft from "@/app/success/page";
import UserDetails from "@/components/userdetail";
import { Typography } from "@mui/material";

export default function IndividualUser() {
  return (
    <>
      <PersistentDrawerLeft />
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontSize: "clamp(0.875)",
          lineHeight: 1.57,
          fontFamily: "sans-serif",
          fontWeight: 600,
          color: "#262626",
          cursor: "pointer",
          position: "absolute",
          top: "120px",
          left: "250px",
          maxWidth: "90vw",
          textAlign: "center",
        }}
      >
        Edit Individual User
      </Typography>
      <UserDetails />
    </>
  );
}
