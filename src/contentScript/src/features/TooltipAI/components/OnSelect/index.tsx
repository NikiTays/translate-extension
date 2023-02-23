import { useSelection } from "../../../../hooks/useSelection";
import Zoom from "@mui/material/Zoom";
import React, { FC, useEffect } from "react";
import { CustomTooltip } from "./components/CustomTooltip";
import { useStore } from "../../../../store/useStore";

interface IOwnProps {
  children: JSX.Element | string;
}

export const OnSelect: FC<IOwnProps> = (props) => {
  const { children } = props;
  const { selection } = useSelection();
  const clearState = useStore((state) => state.clearState);

  useEffect(() => {
    return () => {
      clearState();
    };
  }, [selection, selection?.text]);

  if (selection?.text.length > 1 && selection.text) {
    return (
      <CustomTooltip title={children} TransitionComponent={Zoom} open arrow>
        <div
          style={{
            width: 0,
            height: selection.position.height,
            top: selection.position.top + window.scrollY,
            left:
              selection.position.left +
              selection.position.width / 2 +
              window.scrollX,
            position: "absolute",
          }}
        />
      </CustomTooltip>
    );
  }

  return null;
};
