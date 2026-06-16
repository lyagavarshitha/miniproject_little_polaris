import React from "react";
import { useNavigate } from "react-router-dom";

const LessonsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 p-8">

      <h1 className="text-6xl font-bold mb-12">
        📚 Learning Worlds
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Tiny Explorers */}
        <div className="bg-white rounded-[40px] shadow-2xl p-10">

          <div className="text-8xl mb-6">
            🧸
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Tiny Explorer World
          </h2>

          <p className="text-2xl text-gray-600 mb-8">
            Fun learning adventures for ages 4–7 ✨
          </p>

          <button
            onClick={() => navigate("/tiny-world")}
            className="px-8 py-4 rounded-full bg-pink-500 text-white text-2xl hover:scale-105 transition"
          >
            Enter World 🚀
          </button>

        </div>

        {/* Future Worlds */}
        <div className="bg-white rounded-[40px] shadow-2xl p-10 opacity-70">

          <div className="text-8xl mb-6">
            🚀
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Young Adventurer World
          </h2>

          <p className="text-2xl text-gray-600 mb-8">
            Math, science & puzzles for ages 8–12
          </p>

          <button
            disabled
            className="px-8 py-4 rounded-full bg-gray-400 text-white text-2xl cursor-not-allowed"
          >
            Coming Soon 🔒
          </button>

        </div>

      </div>

    </div>
  );
};

export default LessonsPage;