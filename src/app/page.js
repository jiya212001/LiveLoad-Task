"client";
import LoginForm from "@/components/login";

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
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
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
          borderRadius: "14px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={600}
          color={"black"}
          lineHeight={1.33}
          fontFamily={"sans - serif"}
          sx={{
            position: "absolute",
            top: "40px",
            left: "40px",
            fontSize: "1.5rem",
          }}
        >
          Login To LiveLoads
        </Typography>
        <Link href={"/signup"}>
          <Typography
            variant="h5"
            sx={{
              textDecoration: "none",
              fontSize: "0.875rem",
              lineHeight: 1.57,
              fontFamily: "sans-serif",
              fontWeight: 400,
              color: "blue",
              cursor: "pointer",
              position: "absolute",
              top: "47px",
              right: "34px",
            }}
          >
            "Don't have an account?"
          </Typography>
        </Link>
        <LoginForm />
        <Link href={"/forgotPassword"}>
          <Typography
            variant="h5"
            sx={{
              textDecoration: "none",
              fontSize: "0.9rem",
              lineHeight: 1.57,
              fontFamily: "sans-serif",
              fontWeight: 600,
              color: "#262626",
              cursor: "pointer",
              position: "absolute",
              bottom: "100px",
              right: "23px",
            }}
          >
            Forgot Password ?
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
};

export default BackgroundImage;
