import { Box, Stack } from "@mui/material";
import Image from "next/image";
const Common = ({ children }) => {
  return (
    <>
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
            minHeight: "370px",
            minWidth: "550px",
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
            "@media (max-width: 344px)": {
              top: "20px",
              left: "25px",
              minHeight: "400px",
              minWidth: "375px",
            },
          }}
        ></Stack>
        {children}
      </Box>
    </>
  );
};

export default Common;
