import React, { useState } from "react";
import { Link } from "react-router-dom";
import login from "../assets/login.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex ">
      <div className="w-full md:w-1/2 flex-col justify-center items-center p-8 md:p-12">
        <form
          action=""
          className=" w-full max-w-md  bg-white p-8  rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6 ">
            <h2 className="text-xl font-medium"> Rabbit </h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6"> Hey There</h2>
          <p className="text-center mb-6 ">
            Enter your username and password to login
          </p>
          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-semibold mb-2 ">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please Enter Your Email"
              className={`w-full p-2 border rounded`}
            />
          </div>
          <div className="mb-4 ">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter Your password"
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border rounded`}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Sign in
          </button>
          <p className="mt-6 text-center text-sm  ">
            Don't have account?
            <Link to="/register" className="text-blue-500 ">
              Register here
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w1/2 bg-gray-800 ">
        <div className="h-full flex flex-col justify-center items-center">
          <img src={login} alt="" className="h-[750px] w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;
