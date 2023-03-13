import { useSelection } from "../../../../hooks/useSelection";
import React, { FC, useEffect, useState } from "react";
import { CustomTooltip } from "../CustomTooltip";
import { useAIProviderContext } from "../../AIProvider/AIProvider.context";
import { TViewState } from "../../../../types/state.type";
import { Grow, IconButton } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

interface IOwnProps {
  children: JSX.Element | string;
}

export const OnSelect: FC<IOwnProps> = (props) => {
  const { children } = props;
  const { selection } = useSelection();
  const { viewState, clearState } = useAIProviderContext();
  const [windowScrollX, setWindowScrollX] = useState(window.scrollX);
  const [windowScrollY, setWindowScrollY] = useState(window.scrollY);
  const [isShowContent, setShowContent] = useState<boolean>(false);

  const isOpen = viewState === TViewState.LARGE_RESULT ? 0 : 1;

  useEffect(() => {
    setShowContent(false);
    setWindowScrollX(window.scrollX);
    setWindowScrollY(window.scrollY);
    return () => {
      clearState();
    };
  }, [selection, selection?.text]);

  if (selection?.text.length > 1 && selection.text) {
    return (
      <CustomTooltip
        title={
          isShowContent ? (
            children
          ) : (
            <IconButton size="small" onClick={() => setShowContent(true)}>
              <ZoomInIcon fontSize="small" />
            </IconButton>
          )
        }
        TransitionComponent={Grow}
        open={Boolean(selection.position.top + selection.position.left)}
        // arrow
        sx={{ opacity: isOpen }}
      >
        <div
          style={{
            width: 0,
            height: selection.position.height,
            top: selection.position.top + windowScrollY,
            left:
              selection.position.left +
              selection.position.width / 2 +
              windowScrollX,
            position: "absolute",
          }}
        />
      </CustomTooltip>
    );
  }

  return null;
};
