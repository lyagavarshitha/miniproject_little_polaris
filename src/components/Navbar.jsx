import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-3xl px-8 py-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <span className="text-blue-600">Little Polaris</span>
          <FaStar className="inline ml-2 text-yellow-400" />
        </h1>

        <div className="hidden md:flex items-center gap-10 text-lg font-medium text-gray-700">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
          <Link to="/auth">Login</Link>
        </div>

        <Link
          to="/auth"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-7 py-3 rounded-full shadow-lg hover:scale-105 transition"
        >
          Get Started 🚀
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;