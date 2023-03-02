import React from "react";
import { TooltipAI } from "./src/features/TooltipAI";
import AIProvider from "./src/features/TooltipAI/AIProvider/AIProvider";

const App: React.FC = () => {
  return (
    <AIProvider>
      <TooltipAI />
    </AIProvider>
  );
};

export default App;
