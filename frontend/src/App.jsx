import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import { Login } from "./pages/Login";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* for user */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
          x{/* for admon */}
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
