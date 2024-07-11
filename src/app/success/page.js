import Typography from "@mui/material/Typography";

export default function success() {
  return (
    <Typography
      variant="h5"
      component="div"
      sx={{
        fontSize: "clamp(2.345rem)",
        lineHeight: 1.57,
        fontFamily: "sans-serif",
        fontWeight: 400,
        color: "green",
        cursor: "pointer",
        position: "absolute",
        top: "3vh",
        left: "3vw",
        maxWidth: "90vw",
        textAlign: "center",
      }}
    >
      Congrats you are logged In Successfully
    </Typography>
  );
}
