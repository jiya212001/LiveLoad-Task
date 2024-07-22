"use-client";
import Login from "./auth/login/page";

import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const BackgroundImage = () => {
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
      <Stack
        spacing={2}
        sx={{
          minHeight: "400px",
          minWidth: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          "@media (min-width: 344px)": {
            top: "55%",
            left: "50%",
            minHeight: "400px",
            minWidth: "375px",
          },
        }}
      >
        <Typography
          variant="h3"
          fontWeight={600}
          color={"#262626"}
          lineHeight={1.33}
          fontFamily="Public Sans"
          sx={{
            position: "absolute",
            top: "40px",
            left: "25px",
            fontSize: "24px",

            "@media (max-width: 344px)": {
              fontSize: "1.24rem",
              top: "50px",
              left: "20px",
            },
          }}
        >
          Login To LiveLoads
        </Typography>
        <Link href={"/signup"}>
          <Typography
            variant="h5"
            sx={{
              textDecoration: "none",
              fontSize: "14px",
              lineHeight: 1.57,
              fontFamily: "Public Sans",
              fontWeight: 400,
              color: "#3466d1",
              cursor: "pointer",
              position: "absolute",
              top: "47px",
              right: "8px",

              "@media (max-width: 344px)": {
                fontSize: "0.875rem",
                top: "calc(60px + 28px)", // Adjust based on the original top position difference
                right: "calc(17px + 22px)",
              },
            }}
          >
            Don&apos;t have an account?
          </Typography>
        </Link>
        <Login />
        <Link href={"/forgotPassword"}>
          <Typography
            variant="h5"
            sx={{
              textDecoration: "none",
              fontSize: "14px",
              lineHeight: 1.57,
              fontFamily: "Public Sans",
              fontWeight: 600,
              color: "#262626",
              cursor: "pointer",
              position: "absolute",
              bottom: "100px",
              right: "23px",
            }}
          >
            Forgot Password?
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
};

export default BackgroundImage;
