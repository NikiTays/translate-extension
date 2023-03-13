import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import "@webcomponents/webcomponentsjs";

import App from "./App";

import { generateTheme } from "./src/style/theme";
import { WEB_COMPONENT_NAME } from "./src/const/webComponent";

class TooltipAiWebComponent extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define(WEB_COMPONENT_NAME, TooltipAiWebComponent);

const container = document.createElement(WEB_COMPONENT_NAME);
const shadowContainer = container.attachShadow({ mode: "closed" });

const emotionRootElement = document.createElement("div");
const shadowRootElement = document.createElement("div");

shadowContainer.appendChild(emotionRootElement);
shadowContainer.appendChild(shadowRootElement);

const { emotionCache, theme } = generateTheme({
  shadowRootElement,
  emotionRootElement,
});

const root = createRoot(shadowRootElement);

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

const html = document.querySelector("html");
html.appendChild(container);
