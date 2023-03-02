import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
