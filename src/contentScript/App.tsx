import React, { useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslate } from "./src/hooks/useTranslate";
import { useSelection } from "./src/hooks/useSelection";

const App: React.FC<{}> = () => {
  const { isTranslateLoading, getTranslateText, translateData } =
    useTranslate();
  const { selection } = useSelection();

  useEffect(() => {
    getTranslateText(selection?.text || "");
  }, [selection]);

  if (selection?.text) {
    return (
      <div
        style={{
          transition: "all .2s linear",
          display: "block",
          position: "absolute",
          top: selection.position.top + window.scrollY,
          left: selection.position.left,
          width: selection.position.width,
          height: selection.position.height,
        }}
      >
        <Tooltip
          title={
            <div onMouseUp={(e) => e.stopPropagation()}>
              {isTranslateLoading ? (
                <CircularProgress />
              ) : (
                <Typography variant="body1">{translateData}</Typography>
              )}
            </div>
          }
          TransitionComponent={Zoom}
          open
          arrow
        >
          <div
            style={{
              display: "block",
              top: selection.position.top + window.scrollY,
              left: selection.position.left,
              width: selection.position.width,
              height: selection.position.height,
            }}
          />
        </Tooltip>
      </div>
    );
  }

  return null;
};

export default App;
