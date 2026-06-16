import React, { useState } from "react";
import { FaUserGraduate, FaUsers, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Auth = () => {
  const [role, setRole] = useState("student");
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await API.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("user", JSON.stringify(res.data));

        if (res.data.role === "student") navigate("/student");
        if (res.data.role === "parent") navigate("/parent");
        if (res.data.role === "admin") navigate("/admin");

      } else {
        await API.post("/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          age: role === "student" ? Number(formData.age) : undefined,
          role,
        });

        alert("Account created successfully! Please login.");
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#eef5ff] via-[#f8efff] to-[#eaf3ff] relative overflow-hidden px-4">

      <div className="absolute top-20 left-20 text-yellow-300 text-5xl animate-bounce">⭐</div>
      <div className="absolute bottom-24 right-16 text-pink-300 text-4xl animate-pulse">⭐</div>
      <div className="absolute top-40 right-32 text-purple-300 text-4xl animate-bounce">⭐</div>

      <div className="absolute bottom-0 left-0 w-96 h-48 bg-white/50 blur-3xl rounded-full"></div>
      <div className="absolute top-0 right-0 w-[400px] h-52 bg-white/40 blur-3xl rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md backdrop-blur-2xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-8 z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
            Little Polaris ✨
          </h1>
          <p className="text-gray-600 mt-2">
            Polaris Buddy welcomes you 🌟
          </p>
        </div>

        <div className="flex bg-white/60 rounded-2xl p-1 mb-6 shadow-inner">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-3 rounded-2xl font-semibold ${
              isLogin ? "bg-blue-600 text-white" : "text-gray-600"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-3 rounded-2xl font-semibold ${
              !isLogin ? "bg-blue-600 text-white" : "text-gray-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => setRole("student")}
            className={`p-4 rounded-2xl flex flex-col items-center ${
              role === "student"
                ? "bg-blue-500 text-white"
                : "bg-white/70 text-gray-700"
            }`}
          >
            <FaUserGraduate />
            <span>Student</span>
          </button>

          <button
            onClick={() => setRole("parent")}
            className={`p-4 rounded-2xl flex flex-col items-center ${
              role === "parent"
                ? "bg-purple-500 text-white"
                : "bg-white/70 text-gray-700"
            }`}
          >
            <FaUsers />
            <span>Parent</span>
          </button>

          <button
            onClick={() => setRole("admin")}
            className={`p-4 rounded-2xl flex flex-col items-center ${
              role === "admin"
                ? "bg-pink-500 text-white"
                : "bg-white/70 text-gray-700"
            }`}
          >
            <FaUserShield />
            <span>Admin</span>
          </button>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-white/80"
              />

              {role === "student" && (
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl bg-white/80"
                />
              )}
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white/80"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white/80"
          />

          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold"
          >
            {isLogin ? "Login 🚀" : "Create Account ✨"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;