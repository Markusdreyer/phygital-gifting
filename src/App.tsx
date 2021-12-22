import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import MasterView from "./pages/MasterView";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MasterView />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};

export default App;
