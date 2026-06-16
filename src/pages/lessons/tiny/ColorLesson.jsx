import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

const colors = [
  { name: "Red ❤️", color: "bg-red-500" },
  { name: "Blue 💙", color: "bg-blue-500" },
  { name: "Green 💚", color: "bg-green-500" },
  { name: "Yellow 💛", color: "bg-yellow-400" },
  { name: "Purple 💜", color: "bg-purple-500" },
  { name: "Orange 🧡", color: "bg-orange-500" },
  { name: "Pink 🩷", color: "bg-pink-500" },
  { name: "Brown 🤎", color: "bg-amber-700" },
  { name: "Black 🖤", color: "bg-black" },
  { name: "White 🤍", color: "bg-gray-100 border-4 border-gray-400" },
  { name: "Cyan 🩵", color: "bg-cyan-400" },
  { name: "Lime 💚", color: "bg-lime-400" },
];

const quizQuestions = [
  {
    question: "☀️ What color is the Sun?",
    options: ["Yellow", "Blue", "Red"],
    answer: "Yellow",
  },
  {
    question: "🌿 What color is grass?",
    options: ["Green", "Purple", "Orange"],
    answer: "Green",
  },
  {
    question: "🍊 What color is an orange?",
    options: ["Orange", "Blue", "Red"],
    answer: "Orange",
  },
  {
    question: "🐼 What color is a panda?",
    options: ["Black", "Pink", "Green"],
    answer: "Black",
  },
  {
    question: "☁️ What color are clouds usually?",
    options: ["White", "Purple", "Brown"],
    answer: "White",
  },
  {
    question: "🌸 What color are many flowers?",
    options: ["Pink", "Black", "Brown"],
    answer: "Pink",
  },
];

const ColorLesson = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("learn");
  const [currentColor, setCurrentColor] = useState(0);
  const [practiceScore, setPracticeScore] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  const speakColor = () => {
    const speech = new SpeechSynthesisUtterance(
      colors[currentColor].name
    );

    speech.lang = "en-US";
    speech.rate = 0.8;

    window.speechSynthesis.speak(speech);
  };

  const nextColor = () => {
    if (currentColor < colors.length - 1) {
      setCurrentColor(currentColor + 1);
    } else {
      setCurrentColor(0);
      setMode("practice");
    }
  };

  const handlePractice = (answer) => {
    const correct = colors[currentColor].name;

    if (answer === correct) {
      setPracticeScore((prev) => prev + 1);
      alert("✅ Correct!");
    } else {
      alert(`❌ Wrong! Correct answer is ${correct}`);
    }

    if (currentColor < 4) {
      setCurrentColor((prev) => prev + 1);
    } else {
      setMode("quiz");
    }
  };

  const handleQuiz = (answer) => {
    if (answer === quizQuestions[quizIndex].answer) {
      setQuizScore((prev) => prev + 1);
    }

    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((prev) => prev + 1);
    } else {
      const user =
        JSON.parse(localStorage.getItem("user")) || {};

      const updatedUser = {
  ...user,
  coins: (user.coins || 0) + 50,
  xp: (user.xp || 0) + 25,
};

if (!updatedUser.badges)
  updatedUser.badges = [];

if (!updatedUser.completedLessons)
  updatedUser.completedLessons = [];

if (!updatedUser.lessonStars)
  updatedUser.lessonStars = {};
      if (
  !updatedUser.completedLessons.includes(
    "colors"
  )
) {
  updatedUser.completedLessons.push(
    "colors"
  );
}

updatedUser.lessonStars.colors = 5;

if (
  !updatedUser.badges.includes(
    "Color Explorer"
  )
) {
  updatedUser.badges.push(
    "Color Explorer"
  );
}

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      confetti({
        particleCount: 300,
        spread: 180,
        origin: { y: 0.6 },
      });

      setMode("result");
    }
  };

  if (mode === "learn") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl text-center">

          <h1 className="text-5xl font-bold mb-6">
            🌈 Color Catch
          </h1>

          <video controls className="w-full rounded-3xl mb-6">
            <source
              src="/videos/colors.mp4"
              type="video/mp4"
            />
          </video>

          <button
            onClick={speakColor}
            className="mb-6 px-6 py-3 rounded-full bg-green-500 text-white text-xl font-bold"
          >
            🔊 Read Color
          </button>

          <div
            className={`w-48 h-48 rounded-full mx-auto mb-6 ${colors[currentColor].color}`}
          ></div>

          <h2 className="text-4xl font-bold mb-6">
            {colors[currentColor].name}
          </h2>

          <button
            onClick={nextColor}
            className="px-8 py-4 rounded-full bg-blue-500 text-white text-xl font-bold"
          >
            {currentColor === colors.length - 1
              ? "Start Practice 🎮"
              : "Next →"}
          </button>

        </div>
      </div>
    );
  }

  if (mode === "practice") {
    const item = colors[currentColor];

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl text-center">

          <h1 className="text-4xl font-bold mb-6">
            🎮 Color Practice
          </h1>

          <p className="text-2xl mb-6">
            Tap {item.name}
          </p>

          <div className="space-y-4">
            {colors.slice(0, 3).map((color) => (
              <button
                key={color.name}
                onClick={() =>
                  handlePractice(color.name)
                }
                className={`w-full py-4 rounded-2xl text-white text-2xl font-bold ${color.color}`}
              >
                {color.name}
              </button>
            ))}
          </div>

        </div>
      </div>
    );
  }

  if (mode === "quiz") {
    const q = quizQuestions[quizIndex];

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl text-center">

          <h1 className="text-4xl font-bold mb-6">
            📝 Color Quiz
          </h1>

          <p className="text-2xl mb-8">
            {q.question}
          </p>

          <div className="space-y-4">
            {q.options.map((option) => (
              <button
                key={option}
                onClick={() =>
                  handleQuiz(option)
                }
                className="w-full py-4 rounded-2xl bg-blue-500 text-white text-xl"
              >
                {option}
              </button>
            ))}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-yellow-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-2xl">

        <h1 className="text-5xl font-bold mb-6">
          🎉 Color Master!
        </h1>

        <div className="text-6xl mb-6">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-2xl mb-4">
          Practice: {practiceScore}/5
        </p>

        <p className="text-2xl mb-6">
          Quiz: {quizScore}/3
        </p>

        <div className="bg-yellow-50 rounded-2xl p-6 mb-6">

          <h2 className="text-2xl font-bold mb-4">
            🏆 Rewards Earned
          </h2>

          <p className="text-xl text-green-600 font-semibold">
            💰 +50 Coins
          </p>

          <p className="text-xl text-blue-600 font-semibold">
            ⭐ +25 XP
          </p>

          <p className="text-xl text-purple-600 font-semibold mt-2">
            🏅 Color Explorer Badge
          </p>

        </div>

        <button
          onClick={() => {
            window.location.href = "/tiny-world";
          }}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xl font-bold"
        >
          Back To Tiny Explorer 🌟
        </button>

      </div>
    </div>
  );
};

export default ColorLesson;