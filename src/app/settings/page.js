import { Typography } from "@mui/material";

export default function settings() {
  return (
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
        top: "100px",
        left: "250px",
        maxWidth: "90vw",
        textAlign: "center",
      }}
    >
      Please reset your settings from here
    </Typography>
  );
}
