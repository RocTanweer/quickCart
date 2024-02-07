import { Box } from "@mui/material";

function FlexBox({ children, csx }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...csx,
      }}
    >
      {children}
    </Box>
  );
}

export default FlexBox;
