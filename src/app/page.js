"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const BackgroundImage = () => {
  const router = useRouter();

  useEffect(() => {
    const currentPath = router.pathname;
    if (
      currentPath === "/auth/login" ||
      currentPath === "/auth/forgotPassword" ||
      currentPath === "/auth/signup"
    ) {
      return;
    } else {
      router.push("/auth/login");
    }
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url('/bgimage.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        height: "100%",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        "@media (max-width: 840px)": {
          backgroundImage: `url('/bgimage.jpg')`,
          boxSizing: "border-box",
          backgroundSize: "contain",
          backgroundPosition: "bottom",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "60px",
          left: "60px",
          width: "118px",
          height: "65px",
          zIndex: 10,
        }}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default BackgroundImage;
