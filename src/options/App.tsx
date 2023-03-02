import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import General from "./pages/General/General";
import MyActions from "./pages/MyActions/MyActions";
import Providers from "./pages/Providers/Providers";
import { Menu } from "./layout/Menu";

const App: React.FC<{}> = () => {
  return (
    <Menu>
      <Routes>
        <Route path="/" element={<General />} />
        <Route path="/my-actions" element={<MyActions />} />
        <Route path="/providers" element={<Providers />} />
      </Routes>
    </Menu>
  );
};

export default App;
