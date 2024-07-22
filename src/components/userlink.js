import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UserDetailsLink = ({ userId }) => (
  <Link href={`viewUser/${userId}`}>
    <IconButton style={{ color: "#4caf50" }}>
      <VisibilityIcon />
    </IconButton>
  </Link>
);

export default UserDetailsLink;
