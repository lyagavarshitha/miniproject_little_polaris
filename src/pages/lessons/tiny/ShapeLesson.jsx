import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

const shapesData = [
  { shape: "⭕", name: "Circle" },
  { shape: "⬜", name: "Square" },
  { shape: "🔺", name: "Triangle" },
  { shape: "⭐", name: "Star" },
  { shape: "❤️", name: "Heart" },
  { shape: "🔷", name: "Diamond" },
  { shape: "⬟", name: "Pentagon" },
  { shape: "⬢", name: "Hexagon" },
];

const quizQuestions = [
  {
    question: "Which shape is a Circle?",
    options: ["⭕", "⬜", "🔺"],
    answer: "⭕",
  },
  {
    question: "Which shape is a Square?",
    options: ["⭐", "⬜", "❤️"],
    answer: "⬜",
  },
  {
    question: "Which shape is a Triangle?",
    options: ["🔺", "⭕", "⭐"],
    answer: "🔺",
  },
  {
    question: "Which shape is a Star?",
    options: ["❤️", "⭐", "⬜"],
    answer: "⭐",
  },
  {
    question: "Which shape is a Heart?",
    options: ["🔷", "❤️", "⭕"],
    answer: "❤️",
  },
];

const ShapeLesson = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("learn");
  const [currentShape, setCurrentShape] = useState(0);
  const [practiceScore, setPracticeScore] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const getStars = () => {
    if (quizScore === 5) return "⭐⭐⭐⭐⭐";
    if (quizScore === 4) return "⭐⭐⭐⭐";
    if (quizScore === 3) return "⭐⭐⭐";
    if (quizScore === 2) return "⭐⭐";
    return "⭐";
  };

  const speakShape = () => {
    const speech = new SpeechSynthesisUtterance(
      shapesData[currentShape].name
    );

    speech.lang = "en-US";
    speech.rate = 0.8;

    window.speechSynthesis.speak(speech);
  };

  const nextShape = () => {
    if (currentShape < shapesData.length - 1) {
      setCurrentShape(currentShape + 1);
    } else {
      setCurrentShape(0);
      setMode("practice");
    }
  };

  const handlePractice = (answer) => {
    const correct =
      shapesData[currentShape].shape;

    if (answer === correct) {
      setPracticeScore((prev) => prev + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(
        `❌ Wrong! Correct answer is ${correct}`
      );
    }
  };

  const nextPractice = () => {
    setFeedback("");

    if (currentShape < 4) {
      setCurrentShape((prev) => prev + 1);
    } else {
      setMode("quiz");
    }
  };

  const handleQuiz = (answer) => {
    if (
      answer ===
      quizQuestions[quizIndex].answer
    ) {
      setQuizScore((prev) => prev + 1);
    }

    if (
      quizIndex <
      quizQuestions.length - 1
    ) {
      setQuizIndex((prev) => prev + 1);
    } else {
      confetti({
        particleCount: 250,
        spread: 180,
        origin: { y: 0.6 },
      });

      const user =
        JSON.parse(
          localStorage.getItem("user")
        ) || {};

      const updatedUser = {
        ...user,
        coins:
          (user.coins || 0) + 50,
        xp:
          (user.xp || 0) + 25,
      };

      if (!updatedUser.badges)
        updatedUser.badges = [];

      if (!updatedUser.completedLessons)
        updatedUser.completedLessons = [];

      if (!updatedUser.lessonStars)
        updatedUser.lessonStars = {};

      if (
        !updatedUser.completedLessons.includes(
          "shapes"
        )
      ) {
        updatedUser.completedLessons.push(
          "shapes"
        );
      }

      updatedUser.lessonStars.shapes = 5;

      if (
        !updatedUser.badges.includes(
          "Shape Master"
        )
      ) {
        updatedUser.badges.push(
          "Shape Master"
        );
      }

      updatedUser.level =
        Math.floor(
          (updatedUser.xp || 0) / 100
        ) + 1;

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setMode("result");
    }
  };
    if (mode === "learn") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl text-center">

          <h1 className="text-5xl font-bold mb-6 text-blue-600">
            🔺 Shape Builder
          </h1>

          <video
            controls
            className="w-full rounded-3xl mb-6"
          >
            <source
              src="/videos/shapes.mp4"
              type="video/mp4"
            />
          </video>

          <button
            onClick={speakShape}
            className="mb-6 px-6 py-3 rounded-full bg-green-500 text-white text-xl font-bold"
          >
            🔊 Read Shape
          </button>

          <div className="text-[120px] mb-4">
            {shapesData[currentShape].shape}
          </div>

          <p className="text-4xl font-bold mb-8">
            {shapesData[currentShape].name}
          </p>

          <button
            onClick={nextShape}
            className="px-8 py-4 rounded-full bg-blue-500 text-white text-xl font-bold"
          >
            {currentShape === shapesData.length - 1
              ? "Start Practice 🎮"
              : "Next →"}
          </button>

        </div>
      </div>
    );
  }

  if (mode === "practice") {
    const item = shapesData[currentShape];

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl text-center">

          <h1 className="text-4xl font-bold mb-6">
            🎮 Practice Time
          </h1>

          <p className="text-2xl mb-6">
            Tap the correct shape:
          </p>

          <div className="text-8xl mb-8">
            {item.shape}
          </div>

          <div className="space-y-4">

            {[item.shape, "⭕", "⭐"]
              .filter(
                (value, index, self) =>
                  self.indexOf(value) === index
              )
              .map((option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handlePractice(option)
                  }
                  className="w-full py-4 rounded-2xl bg-purple-500 text-white text-4xl"
                >
                  {option}
                </button>
              ))}

          </div>

          {feedback && (
            <div className="mt-6">

              <p className="text-2xl font-bold">
                {feedback}
              </p>

              <button
                onClick={nextPractice}
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-xl"
              >
                Next →
              </button>

            </div>
          )}

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
            📝 Shape Quiz
          </h1>

          <p className="text-2xl mb-8">
            {q.question}
          </p>

          <div className="space-y-4">

            {q.options.map((option, index) => (
              <button
                key={index}
                onClick={() =>
                  handleQuiz(option)
                }
                className="w-full py-4 rounded-2xl bg-blue-500 text-white text-4xl"
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
          🎉 Shape Mission Complete!
        </h1>

        <div className="text-6xl mb-6">
          {getStars()}
        </div>

        <p className="text-2xl mb-4">
          Practice Score: {practiceScore}/5
        </p>

        <p className="text-2xl mb-6">
          Quiz Score: {quizScore}/5
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
            🏅 Shape Master Badge
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/tiny-world")
          }
          className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold"
        >
          Back To Tiny Explorer 🌟
        </button>

      </div>

    </div>
  );
};

export default ShapeLesson;