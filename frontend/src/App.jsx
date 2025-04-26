import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* for user */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          {/* for admon */}
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
