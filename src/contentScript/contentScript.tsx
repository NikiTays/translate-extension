import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import App from "./App";

import { generateTheme } from "./src/style/theme";

const container = document.createElement("div");
const shadowContainer = container.attachShadow({ mode: "closed" });
const emotionRootElement = document.createElement("head");
const shadowRootElement = document.createElement("div");
shadowContainer.appendChild(emotionRootElement);
shadowContainer.appendChild(shadowRootElement);
document.body.appendChild(container);

const root = createRoot(shadowRootElement);

const { emotionCache, theme } = generateTheme({
  shadowRootElement,
  emotionRootElement,
});

root.render(
  <React.StrictMode>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
