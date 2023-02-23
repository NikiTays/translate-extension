import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Z_INDEX_MAX_VALUE } from "../const/cssMaxValue";
import createCache from "@emotion/cache";

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

  const emotionCache = createCache({
    key: "tooltipai",
    prepend: true,
    container: emotionRootElement,
  });

  const theme = responsiveFontSizes(darkTheme);

  return {
    theme,
    emotionCache,
  };
};
