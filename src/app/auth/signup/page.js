"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";

const Signup = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/signup");
  }, []);

  return (
    <>
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
          top: "3vh",
          left: "3vw",
          maxWidth: "90vw",
          textAlign: "center",
        }}
      >
        Please Register your details over here
      </Typography>
    </>
  );
};
export default Signup;
