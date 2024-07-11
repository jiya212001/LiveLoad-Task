import Typography from "@mui/material/Typography";

export default function password() {
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
        top: "3vh",
        left: "3vw",
        maxWidth: "90vw",
        textAlign: "center",
      }}
    >
      Forgot Password? | Enter email and get reset link over there
    </Typography>
  );
}
