import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCoins, FaFire, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import penguin from "../assets/penguin.png";
import books from "../assets/books.png";
import controller from "../assets/controller.png";
import clipboard from "../assets/clipboard.png";
import robot from "../assets/robot.png";

import API from "../services/api";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const sendMessage = async (quickMessage = null) => {
    const input = document.getElementById("chat-input");
    const chatBox = document.getElementById("chat-box");

    const message = quickMessage || input.value;

    if (!message.trim()) return;

    chatBox.innerHTML += `
      <div style="
        background:#dbeafe;
        padding:12px;
        border-radius:16px;
        margin-left:auto;
        max-width:85%;
        margin-top:10px;
      ">
        ${message}
      </div>
    `;

    if (input) input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    setChatLoading(true);

    try {
      const res = await API.post("/ai/chat", {
        message,
      });

      chatBox.innerHTML += `
        <div style="
          background:#f3f4f6;
          padding:12px;
          border-radius:16px;
          max-width:85%;
          margin-top:10px;
        ">
          ${res.data.reply}
        </div>
      `;
    } catch {
      chatBox.innerHTML += `
        <div style="
          background:#fee2e2;
          padding:12px;
          border-radius:16px;
          max-width:85%;
          margin-top:10px;
        ">
          Polaris Buddy is sleeping 😴
        </div>
      `;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
    setChatLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef5ff] via-[#f7efff] to-[#edf7ff] p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-3 space-y-8">

          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-[35px] shadow-xl p-10 flex flex-col md:flex-row items-center justify-between"
          >
            <div>
              <h1 className="text-6xl font-extrabold text-[#1d2433] leading-tight">
                Welcome Back,
                <br />
                Explorer 🌟
              </h1>

              <p className="text-gray-500 text-xl mt-5 max-w-xl">
                Ready to learn, play, and grow with Little Polaris?
              </p>
            </div>

            <img src={penguin} alt="penguin" className="w-[330px]" />
          </motion.div>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-[28px] p-6 shadow-lg">
              <FaStar className="text-yellow-400 text-4xl mb-4" />
              <p className="text-gray-500">XP Points</p>
              <h2 className="text-5xl font-bold">1200</h2>
            </div>

            <div className="bg-white rounded-[28px] p-6 shadow-lg">
              <FaCoins className="text-yellow-500 text-4xl mb-4" />
              <p className="text-gray-500">Coins</p>
              <h2 className="text-5xl font-bold">{user?.coins || 0}</h2>
            </div>

            <div className="bg-white rounded-[28px] p-6 shadow-lg">
              <FaFire className="text-orange-500 text-4xl mb-4" />
              <p className="text-gray-500">Streak</p>
              <h2 className="text-5xl font-bold">{user?.streak || 0}</h2>
            </div>

            <div className="bg-white rounded-[28px] p-6 shadow-lg">
              🧠
              <p className="text-gray-500 mt-4">Lessons Done</p>
              <h2 className="text-5xl font-bold">18</h2>
            </div>
          </div>

          {/* FEATURE CARDS */}
          <div className="grid md:grid-cols-4 gap-6">
            <div
              onClick={() => navigate("/student/lessons")}
              className="bg-white rounded-[30px] p-8 shadow-lg cursor-pointer hover:scale-105 transition"
            >
              <img src={books} alt="books" className="w-20 mb-6" />
              <h2 className="text-2xl font-bold">Lessons</h2>
            </div>

            <div
              onClick={() => navigate("/student/games")}
              className="bg-white rounded-[30px] p-8 shadow-lg cursor-pointer hover:scale-105 transition"
            >
              <img src={controller} alt="games" className="w-20 mb-6" />
              <h2 className="text-2xl font-bold">Premium Games</h2>
            </div>

            <div
              onClick={() => navigate("/student/quizzes")}
              className="bg-white rounded-[30px] p-8 shadow-lg cursor-pointer hover:scale-105 transition"
            >
              <img src={clipboard} alt="quiz" className="w-20 mb-6" />
              <h2 className="text-2xl font-bold">Quizzes</h2>
            </div>

            <div
              onClick={() => navigate("/student/chores")}
              className="bg-white rounded-[30px] p-8 shadow-lg cursor-pointer hover:scale-105 transition"
            >
              🧹
              <h2 className="text-2xl font-bold mt-6">Daily Chores</h2>
            </div>
          </div>
        </div>

        {/* RIGHT AI */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-white/90 backdrop-blur-xl rounded-[35px] shadow-xl p-6 h-[750px] flex flex-col">

            <img src={robot} alt="robot" className="w-28 mx-auto mb-4" />

            <h2 className="text-2xl font-bold text-center">
              Polaris Buddy 🤖
            </h2>

            <div
              id="chat-box"
              className="flex-1 overflow-y-auto space-y-3 bg-gray-50 rounded-2xl p-4 mt-4"
            >
              <div className="bg-blue-100 p-3 rounded-2xl max-w-[85%]">
                Hi explorer! 🌟
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button onClick={() => sendMessage("Teach me alphabets")} className="bg-blue-50 p-2 rounded-xl text-sm">
                Alphabets 📚
              </button>

              <button onClick={() => sendMessage("Tell me a story")} className="bg-purple-50 p-2 rounded-xl text-sm">
                Story 🌙
              </button>

              <button onClick={() => sendMessage("Give me a quiz")} className="bg-pink-50 p-2 rounded-xl text-sm">
                Quiz 📝
              </button>

              <button onClick={() => sendMessage("Explain addition")} className="bg-green-50 p-2 rounded-xl text-sm">
                Addition ➕
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              <input
                id="chat-input"
                type="text"
                placeholder="Ask Polaris Buddy..."
                className="flex-1 p-3 rounded-2xl border outline-none"
              />

              <button
                onClick={() => sendMessage()}
                className="px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                {chatLoading ? "Thinking..." : "Send"}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;