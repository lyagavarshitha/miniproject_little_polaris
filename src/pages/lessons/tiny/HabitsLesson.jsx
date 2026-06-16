import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

const habitsData = [
  { emoji: "🪥", name: "Brush Teeth" },
  { emoji: "🛁", name: "Take Bath" },
  { emoji: "🧼", name: "Wash Hands" },
  { emoji: "🥗", name: "Eat Healthy Food" },
  { emoji: "💧", name: "Drink Water" },
  { emoji: "😴", name: "Sleep Early" },
  { emoji: "📚", name: "Study Daily" },
  { emoji: "🧹", name: "Keep Room Clean" },
];

const quizQuestions = [
  {
    question: "What should you do before sleeping?",
    options: ["🪥", "🍫", "📱"],
    answer: "🪥",
  },
  {
    question: "Which habit keeps your body clean?",
    options: ["🛁", "🍔", "🎮"],
    answer: "🛁",
  },
  {
    question: "What should you do before eating?",
    options: ["🧼", "🍭", "📺"],
    answer: "🧼",
  },
  {
    question: "What should you drink often?",
    options: ["💧", "🍫", "🍟"],
    answer: "💧",
  },
  {
    question: "What helps you learn?",
    options: ["📚", "🎮", "🍬"],
    answer: "📚",
  },
];

const HabitsLesson = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("learn");
  const [currentHabit, setCurrentHabit] = useState(0);
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

  const speakHabit = () => {
    const speech = new SpeechSynthesisUtterance(
      habitsData[currentHabit].name
    );

    speech.lang = "en-US";
    speech.rate = 0.8;

    window.speechSynthesis.speak(speech);
  };

  const nextHabit = () => {
    if (
      currentHabit <
      habitsData.length - 1
    ) {
      setCurrentHabit(
        currentHabit + 1
      );
    } else {
      setCurrentHabit(0);
      setMode("practice");
    }
  };

  const handlePractice = (
    answer
  ) => {
    const correct =
      habitsData[currentHabit].emoji;

    if (answer === correct) {
      setPracticeScore(
        (prev) => prev + 1
      );

      setFeedback(
        "✅ Correct!"
      );
    } else {
      setFeedback(
        `❌ Wrong! Correct answer is ${correct}`
      );
    }
  };

  const nextPractice = () => {
    setFeedback("");

    if (currentHabit < 4) {
      setCurrentHabit(
        (prev) => prev + 1
      );
    } else {
      setMode("quiz");
    }
  };

  const handleQuiz = (
    answer
  ) => {
    if (
      answer ===
      quizQuestions[quizIndex]
        .answer
    ) {
      setQuizScore(
        (prev) => prev + 1
      );
    }

    if (
      quizIndex <
      quizQuestions.length - 1
    ) {
      setQuizIndex(
        (prev) => prev + 1
      );
    } else {
      confetti({
        particleCount: 250,
        spread: 180,
        origin: { y: 0.6 },
      });

      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
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
          "habits"
        )
      ) {
        updatedUser.completedLessons.push(
          "habits"
        );
      }

      updatedUser.lessonStars.habits = 5;

      if (
        !updatedUser.badges.includes(
          "Good Habits Hero"
        )
      ) {
        updatedUser.badges.push(
          "Good Habits Hero"
        );
      }

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setMode("result");
    }
  };
    if (mode === "learn") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-green-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl text-center">

          <h1 className="text-5xl font-bold mb-6 text-green-600">
            🪥 Good Habits Hero
          </h1>

          <video
            controls
            className="w-full rounded-3xl mb-6"
          >
            <source
              src="/videos/habits.mp4"
              type="video/mp4"
            />
          </video>

          <button
            onClick={speakHabit}
            className="mb-6 px-6 py-3 rounded-full bg-green-500 text-white text-xl font-bold"
          >
            🔊 Read Habit
          </button>

          <div className="text-[120px] mb-4">
            {habitsData[currentHabit].emoji}
          </div>

          <p className="text-4xl font-bold mb-8">
            {habitsData[currentHabit].name}
          </p>

          <button
            onClick={nextHabit}
            className="px-8 py-4 rounded-full bg-green-500 text-white text-xl font-bold"
          >
            {currentHabit === habitsData.length - 1
              ? "Start Practice 🎮"
              : "Next →"}
          </button>

        </div>
      </div>
    );
  }

  if (mode === "practice") {
    const item = habitsData[currentHabit];

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl text-center">

          <h1 className="text-4xl font-bold mb-6">
            🎮 Practice Time
          </h1>

          <p className="text-2xl mb-6">
            Tap the correct habit:
          </p>

          <div className="text-8xl mb-8">
            {item.emoji}
          </div>

          <div className="space-y-4">

            {[item.emoji, "🪥", "📚"]
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
                  className="w-full py-4 rounded-2xl bg-orange-500 text-white text-4xl"
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
            📝 Habits Quiz
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
          🎉 Good Habits Mission Complete!
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
            🏅 Good Habits Hero Badge
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/tiny-world")
          }
          className="px-8 py-4 rounded-full bg-gradient-to-r from-green-600 to-blue-600 text-white text-xl font-bold"
        >
          Back To Tiny Explorer 🌟
        </button>

      </div>

    </div>
  );
};

export default HabitsLesson;