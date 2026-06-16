import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import mascot from "../assets/mascot.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-r from-[#eef5ff] via-[#f7efff] to-[#e7f1ff] relative">
      <Navbar />

      {/* floating stars */}
      <div className="absolute top-32 left-1/3 text-yellow-300 text-5xl animate-bounce">
        ⭐
      </div>

      <div className="absolute bottom-28 left-20 text-pink-300 text-4xl animate-pulse">
        ⭐
      </div>

      <div className="absolute top-40 right-28 text-purple-300 text-4xl animate-bounce">
        ⭐
      </div>

      {/* clouds */}
      <div className="absolute bottom-0 left-0 w-96 h-48 bg-white/50 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-52 bg-white/50 blur-3xl rounded-full"></div>

      <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-10 md:px-20 pt-36">
        {/* left */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 z-10"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight text-gray-900">
            Learn, Play & Grow <br />
            with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
              Little Polaris
            </span>{" "}
            ⭐
          </h1>

          <p className="text-2xl text-gray-600 mt-8 leading-relaxed max-w-xl">
            Gamified learning for kids with AI tutoring, rewards, quizzes,
            daily chores, and progress tracking.
          </p>

          <Link
            to="/auth"
            className="inline-block mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-full text-xl font-semibold shadow-2xl hover:scale-105 transition"
          >
            Get Started 🚀
          </Link>
        </motion.div>

        {/* right */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 flex justify-center z-10"
        >
          <img
            src={mascot}
            alt="Little Polaris Mascot"
            className="w-[700px] drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;