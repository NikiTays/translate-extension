import React from "react";
import { ActionUI } from "./src/features/ActionUI";
import { Menu } from "./src/layout/Menu";

const App: React.FC<{}> = () => {
  return (
    <Menu>
      <ActionUI />
    </Menu>
  );
};

export default App;
