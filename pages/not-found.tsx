import { Box } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      sx={{
        background: "black",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "40vh",
      }}
    >
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href='/' style={{ color: "white" }}>
        Return Home
      </Link>
    </Box>
  );
}
