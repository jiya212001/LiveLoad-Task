import { Stack } from "@mui/material";

const Common = ({ children }) => {
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          minHeight: "400px",
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
      >
        {children}
      </Stack>
    </>
  );
};

export default Common;
