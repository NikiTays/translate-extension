import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Z_INDEX_MAX_VALUE } from "../const/cssMaxValue";
import createCache, { StylisPlugin } from "@emotion/cache";
import { WEB_COMPONENT_NAME } from "../const/webComponent";
import { remToPx } from "../utils/remToPx";

interface IGenerateTheme {
  shadowRootElement: HTMLDivElement;
  emotionRootElement: HTMLHeadElement;
}

export const generateTheme = (params: IGenerateTheme) => {
  const { shadowRootElement, emotionRootElement } = params;
  const darkTheme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          popper: {
            zIndex: Z_INDEX_MAX_VALUE + "!important",
          },
          tooltip: {
            backdropFilter: "saturate(280%) blur(20px)",
            background: "rgba(29,29,31,0.72)",
            borderRadius: "8px",
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

  const remToPxStylisPlugin: StylisPlugin = (element) => {
    element.return = remToPx(element.return);
    element.value = remToPx(element.value);
  };

  const emotionCache = createCache({
    nonce: WEB_COMPONENT_NAME,
    key: WEB_COMPONENT_NAME,
    prepend: true,
    container: emotionRootElement,
    stylisPlugins: [remToPxStylisPlugin],
  });

  const theme = responsiveFontSizes(darkTheme);

  return {
    theme,
    emotionCache,
  };
};
