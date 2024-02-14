import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./themeContext";

const MyThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MyThemeProvider;
