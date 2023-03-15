import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { css, CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { theme } from "./src/styles/theme";

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={css`
          body {
            //background: linear-gradient(
            //  109.6deg,
            //  rgb(36, 45, 57) 11.2%,
            //  rgb(16, 37, 60) 51.2%,
            //  rgb(0, 0, 0) 98.6%
            //);

            background: radial-gradient(
              circle at 24.1% 68.8%,
              rgb(50, 50, 50) 0%,
              rgb(0, 0, 0) 99.4%
            );
          }
        `}
      />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
