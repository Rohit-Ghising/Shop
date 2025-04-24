import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* for user */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
          </Route>
          x{/* for admon */}
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
