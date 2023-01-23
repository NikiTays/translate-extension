import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const theme = responsiveFontSizes(darkTheme);
