import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* for user */}
          <Route path="/" element={<UserLayout />}></Route>
          {/* for admon */}
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
