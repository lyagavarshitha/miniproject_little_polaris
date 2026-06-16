import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

const animalsData = [
  { animal: "🐶", name: "Dog" },
  { animal: "🐱", name: "Cat" },
  { animal: "🐮", name: "Cow" },
  { animal: "🦁", name: "Lion" },
  { animal: "🐘", name: "Elephant" },
  { animal: "🐵", name: "Monkey" },
  { animal: "🐸", name: "Frog" },
  { animal: "🐔", name: "Chicken" },
];

const quizQuestions = [
  {
    question: "Which animal is a Dog?",
    options: ["🐶", "🐱", "🐮"],
    answer: "🐶",
  },
  {
    question: "Which animal is a Cat?",
    options: ["🐘", "🐱", "🐸"],
    answer: "🐱",
  },
  {
    question: "Which animal is a Lion?",
    options: ["🐵", "🦁", "🐶"],
    answer: "🦁",
  },
  {
    question: "Which animal is an Elephant?",
    options: ["🐘", "🐔", "🐱"],
    answer: "🐘",
  },
  {
    question: "Which animal is a Monkey?",
    options: ["🐸", "🐵", "🐮"],
    answer: "🐵",
  },
];

const AnimalLesson = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("learn");
  const [currentAnimal, setCurrentAnimal] = useState(0);
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

  const speakAnimal = () => {
    const speech =
      new SpeechSynthesisUtterance(
        animalsData[currentAnimal].name
      );

    speech.lang = "en-US";
    speech.rate = 0.8;

    window.speechSynthesis.speak(speech);
  };

  const nextAnimal = () => {
    if (
      currentAnimal <
      animalsData.length - 1
    ) {
      setCurrentAnimal(
        currentAnimal + 1
      );
    } else {
      setCurrentAnimal(0);
      setMode("practice");
    }
  };

  const handlePractice = (
    answer
  ) => {
    const correct =
      animalsData[currentAnimal].animal;

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

    if (currentAnimal < 4) {
      setCurrentAnimal(
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
          "animals"
        )
      ) {
        updatedUser.completedLessons.push(
          "animals"
        );
      }

      updatedUser.lessonStars.animals = 5;

      if (
        !updatedUser.badges.includes(
          "Animal Expert"
        )
      ) {
        updatedUser.badges.push(
          "Animal Expert"
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl text-center">

          <h1 className="text-5xl font-bold mb-6 text-green-600">
            🐶 Animal Sounds Safari
          </h1>

          <video
            controls
            className="w-full rounded-3xl mb-6"
          >
            <source
              src="/videos/animals.mp4"
              type="video/mp4"
            />
          </video>

          <button
            onClick={speakAnimal}
            className="mb-6 px-6 py-3 rounded-full bg-green-500 text-white text-xl font-bold"
          >
            🔊 Read Animal
          </button>

          <div className="text-[120px] mb-4">
            {animalsData[currentAnimal].animal}
          </div>

          <p className="text-4xl font-bold mb-8">
            {animalsData[currentAnimal].name}
          </p>

          <button
            onClick={nextAnimal}
            className="px-8 py-4 rounded-full bg-green-500 text-white text-xl font-bold"
          >
            {currentAnimal === animalsData.length - 1
              ? "Start Practice 🎮"
              : "Next →"}
          </button>

        </div>
      </div>
    );
  }

  if (mode === "practice") {
    const item = animalsData[currentAnimal];

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl text-center">

          <h1 className="text-4xl font-bold mb-6">
            🎮 Practice Time
          </h1>

          <p className="text-2xl mb-6">
            Tap the correct animal:
          </p>

          <div className="text-8xl mb-8">
            {item.animal}
          </div>

          <div className="space-y-4">

            {[item.animal, "🐶", "🦁"]
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
            📝 Animal Quiz
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
          🎉 Animal Mission Complete!
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
            🏅 Animal Expert Badge
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

export default AnimalLesson;