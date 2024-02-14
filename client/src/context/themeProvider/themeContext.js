import { createTheme } from "@mui/material/styles";
import shadows from "@mui/material/styles/shadows";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
    success: {
      main: "#28a745",
    },
    error: {
      main: "#dc3545",
    },
    info: {
      main: "#17a2b8",
    },
    warning: {
      main: "#ed6c02",
    },
    divider: "#6c757d",
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          color: "#000",
        },
      },
    },
  },
  shadows: shadows.map(() => "none"),
});
