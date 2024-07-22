import Typography from "@mui/material/Typography";

export default function main() {
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
          color: "black",
          cursor: "pointer",
          position: "absolute",
          top: "300px",
          left: "300px",
          maxWidth: "90vw",
          textAlign: "center",
        }}
      >
        Welcome To dashboard Page
      </Typography>
    </>
  );
}
