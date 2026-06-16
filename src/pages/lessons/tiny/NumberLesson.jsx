import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
const numberData = [
  { number: 1, word: "One 🍎" },
  { number: 2, word: "Two 🍌🍌" },
  { number: 3, word: "Three ⭐⭐⭐" },
  { number: 4, word: "Four 🐶🐶🐶🐶" },
  { number: 5, word: "Five 🎈🎈🎈🎈🎈" },
  { number: 6, word: "Six 🚗🚗🚗🚗🚗🚗" },
  { number: 7, word: "Seven 🌈🌈🌈🌈🌈🌈🌈" },
  { number: 8, word: "Eight 🍩🍩🍩🍩🍩🍩🍩🍩" },
  { number: 9, word: "Nine ⚽⚽⚽⚽⚽⚽⚽⚽⚽" },
  { number: 10, word: "Ten 🧸🧸🧸🧸🧸🧸🧸🧸🧸🧸" },
];

const NumberLesson = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("learn");
  const [currentNumber, setCurrentNumber] = useState(0);
  const [practiceScore, setPracticeScore] = useState(0);

  const speakNumber = () => {
    const speech = new SpeechSynthesisUtterance(
      `${numberData[currentNumber].number}. ${numberData[currentNumber].word}`
    );

    speech.lang = "en-US";
    speech.rate = 0.8;

    window.speechSynthesis.speak(speech);
  };

  const nextNumber = () => {
    if (currentNumber < numberData.length - 1) {
      setCurrentNumber(currentNumber + 1);
    } else {
      setCurrentNumber(0);
      setMode("practice");
    }
  };

  const handlePractice = (answer) => {
    const correct = numberData[currentNumber].number;

    if (answer === correct) {
      setPracticeScore((prev) => prev + 1);
      alert("✅ Correct!");
    } else {
      alert(`❌ Wrong! Correct answer is ${correct}`);
    }

    if (currentNumber < 4) {
      setCurrentNumber(currentNumber + 1);
    } else {
  confetti({
    particleCount: 300,
    spread: 180,
    origin: { y: 0.6 },
  });

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
    "numbers"
  )
) {
  updatedUser.completedLessons.push(
    "numbers"
  );
}

updatedUser.lessonStars.numbers = 5;

if (
  !updatedUser.badges.includes(
    "Number Master"
  )
) {
  updatedUser.badges.push(
    "Number Master"
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl text-center">

          <h1 className="text-5xl font-bold mb-6 text-orange-600">
            🔢 Number Treasure Hunt
          </h1>

          <video
            controls
            className="w-full rounded-3xl mb-6"
          >
            <source
              src="/videos/numbers.mp4"
              type="video/mp4"
            />
          </video>

          <button
            onClick={speakNumber}
            className="mb-6 px-6 py-3 rounded-full bg-green-500 text-white text-xl font-bold"
          >
            🔊 Read Number
          </button>

          <div className="text-9xl font-bold text-orange-500 mb-6">
            {numberData[currentNumber].number}
          </div>

          <p className="text-3xl mb-8">
            {numberData[currentNumber].word}
          </p>

          <div className="flex justify-center gap-4">

            <button
              disabled={currentNumber === 0}
              onClick={() =>
                setCurrentNumber(currentNumber - 1)
              }
              className="px-8 py-4 rounded-full bg-gray-400 text-white text-xl font-bold"
            >
              ← Previous
            </button>

            <button
              onClick={nextNumber}
              className="px-8 py-4 rounded-full bg-orange-500 text-white text-xl font-bold"
            >
              {currentNumber === 9
                ? "Start Practice 🎮"
                : "Next →"}
            </button>

          </div>

          <div className="mt-8">
            <p className="text-lg text-gray-500">
              Number {currentNumber + 1} of {numberData.length}
            </p>
          </div>

        </div>
      </div>
    );
  }

  if (mode === "practice") {
    const item = numberData[currentNumber];

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl text-center">

          <h1 className="text-4xl font-bold mb-6">
            🎮 Number Practice
          </h1>

          <p className="text-2xl mb-6">
            Select the correct number
          </p>

          <div className="text-6xl mb-6">
            {item.word}
          </div>

          <div className="space-y-4">

            {[item.number, item.number + 1, item.number + 2]
              .sort(() => Math.random() - 0.5)
              .map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    handlePractice(option)
                  }
                  className="w-full py-4 rounded-2xl bg-orange-500 text-white text-2xl"
                >
                  {option}
                </button>
              ))}

          </div>

        </div>
      </div>
    );
  }

  if (mode === "result") {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-yellow-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-2xl">

        <h1 className="text-5xl font-bold mb-6">
          🎉 Number Mission Complete!
        </h1>

        <div className="text-6xl mb-6">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-2xl mb-4">
          Practice Score: {practiceScore}/5
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
            🏅 Number Master Badge Unlocked
          </p>

        </div>

        <button
          onClick={() => navigate("/tiny-world")}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xl font-bold"
        >
          Back To Tiny Explorer 🌟
        </button>

      </div>
    </div>
  );
}
};

export default NumberLesson;