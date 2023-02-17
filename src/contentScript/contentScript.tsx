import React from "react";
import { createRoot } from "react-dom/client";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import App from "./App";
import createCache from "@emotion/cache";
import { CacheProvider, Global, css } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Z_INDEX_MAX_VALUE } from "./src/const/cssMaxValue";

const container = document.createElement("div");
const shadowContainer = container.attachShadow({ mode: "closed" });
const emotionRoot = document.createElement("head");
const shadowRootElement = document.createElement("div");
shadowContainer.appendChild(emotionRoot);
shadowContainer.appendChild(shadowRootElement);

document.body.appendChild(container);

const darkTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        popper: {
          zIndex: Z_INDEX_MAX_VALUE + "!important",
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        container: shadowRootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: shadowRootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: shadowRootElement,
      },
    },
  },
  palette: {
    mode: "dark",
  },
});

const cache = createCache({
  key: "tooltipai",
  prepend: true,
  container: emotionRoot,
});

const theme = responsiveFontSizes(darkTheme);

const root = createRoot(shadowRootElement);

root.render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
