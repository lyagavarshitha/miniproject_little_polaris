import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
const alphabetData = [
  { letter: "A", word: "Apple 🍎" },
  { letter: "B", word: "Ball ⚽" },
  { letter: "C", word: "Cat 🐱" },
  { letter: "D", word: "Dog 🐶" },
  { letter: "E", word: "Elephant 🐘" },
  { letter: "F", word: "Fish 🐟" },
  { letter: "G", word: "Grapes 🍇" },
  { letter: "H", word: "Hat 🎩" },
  { letter: "I", word: "Ice Cream 🍦" },
  { letter: "J", word: "Juice 🧃" },
  { letter: "K", word: "Kite 🪁" },
  { letter: "L", word: "Lion 🦁" },
  { letter: "M", word: "Monkey 🐵" },
  { letter: "N", word: "Nest 🪺" },
  { letter: "O", word: "Orange 🍊" },
  { letter: "P", word: "Penguin 🐧" },
  { letter: "Q", word: "Queen 👑" },
  { letter: "R", word: "Rainbow 🌈" },
  { letter: "S", word: "Sun ☀️" },
  { letter: "T", word: "Tiger 🐯" },
  { letter: "U", word: "Umbrella ☂️" },
  { letter: "V", word: "Violin 🎻" },
  { letter: "W", word: "Whale 🐋" },
  { letter: "X", word: "Xylophone 🎵" },
  { letter: "Y", word: "Yacht ⛵" },
  { letter: "Z", word: "Zebra 🦓" },
];

const quizQuestions = [
  {
    question: "🍎 What letter starts Apple?",
    options: ["A", "B", "D"],
    answer: "A",
  },
  {
    question: "⚽ What letter starts Ball?",
    options: ["C", "B", "Z"],
    answer: "B",
  },
  {
    question: "🐱 What letter starts Cat?",
    options: ["K", "C", "P"],
    answer: "C",
  },
  {
    question: "🐶 What letter starts Dog?",
    options: ["D", "G", "T"],
    answer: "D",
  },
  {
    question: "🦓 What letter starts Zebra?",
    options: ["X", "Z", "A"],
    answer: "Z",
  },
];

const AlphabetLesson = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("teach");
  const [currentLetter, setCurrentLetter] = useState(0);
  const [practiceScore, setPracticeScore] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showNext, setShowNext] = useState(false);
  const getStars = () => {
  if (quizScore === 5) return "⭐⭐⭐⭐⭐";
  if (quizScore === 4) return "⭐⭐⭐⭐";
  if (quizScore === 3) return "⭐⭐⭐";
  if (quizScore === 2) return "⭐⭐";
  return "⭐";
};

  const speakLetter = () => {
    const speech = new SpeechSynthesisUtterance(
      `${alphabetData[currentLetter].letter} for ${alphabetData[currentLetter].word}`
    );

    speech.lang = "en-US";
    speech.rate = 0.8;

    window.speechSynthesis.speak(speech);
  };

  const nextLetter = () => {
    if (currentLetter < alphabetData.length - 1) {
      setCurrentLetter(currentLetter + 1);
    } else {
      setMode("practice");
      setCurrentLetter(0);
    }
  };

  const handlePractice = (answer) => {
  const correctAnswer =
    alphabetData[currentLetter].letter;

  if (answer === correctAnswer) {
    setPracticeScore((prev) => prev + 1);
    setFeedback("✅ Correct!");
  } else {
    setFeedback(
      `❌ Wrong! Correct answer is ${correctAnswer}`
    );
  }

  setShowNext(true);
};
  const handleQuiz = (answer) => {
    if (answer === quizQuestions[quizIndex].answer) {
      setQuizScore((prev) => prev + 1);
    }

    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((prev) => prev + 1);
    } else {
      confetti({
  particleCount: 200,
  spread: 120,
  origin: { y: 0.6 },
});
      setMode("result");

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
    "alphabet"
  )
) {
  updatedUser.completedLessons.push(
    "alphabet"
  );
}

updatedUser.lessonStars.alphabet = 5;

if (
  !updatedUser.badges.includes(
    "Alphabet Star"
  )
) {
  updatedUser.badges.push(
    "Alphabet Star"
  );
}

      updatedUser.level =
        Math.floor(updatedUser.xp / 100) + 1;

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    }
  };

  if (mode === "teach") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-2xl text-center">

          <h1 className="text-4xl font-bold mb-6">
            🔤 Alphabet Adventure
          </h1>

          <video
            controls
            className="w-full rounded-3xl mb-6"
          >
            <source
              src="/videos/alphabet.mp4"
              type="video/mp4"
            />
          </video>
          <button
            onClick={speakLetter}
            className="mb-6 px-6 py-3 rounded-full bg-green-500 text-white"
          >
            🔊 Read Letter
          </button>

          <div className="text-8xl font-bold text-blue-600 mb-6">
            {alphabetData[currentLetter].letter}
          </div>

          <p className="text-3xl mb-8">
            {alphabetData[currentLetter].word}
          </p>

          <button
            onClick={nextLetter}
            className="px-8 py-4 rounded-full bg-blue-500 text-white text-xl"
          >
            Next →
          </button>

        </div>
      </div>
    );
  }

  if (mode === "practice") {
    const item = alphabetData[currentLetter];

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl text-center">

          <h1 className="text-4xl font-bold mb-6">
            🎮 Practice Time
          </h1>

          <p className="text-2xl mb-6">
            Tap the correct letter for {item.word}
          </p>

          <div className="space-y-4">
            {["A", item.letter, "Z"]
              .sort()
              .map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    handlePractice(option)
                  }
                  className="w-full py-4 rounded-2xl bg-purple-500 text-white text-xl"
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
      onClick={() => {
        setFeedback("");
        setShowNext(false);

        if (currentLetter < 4) {
          setCurrentLetter((prev) => prev + 1);
        } else {
          setMode("quiz");
        }
      }}
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
            📝 Final Quiz
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
        🎉 Mission Complete!
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
          🏅 Alphabet Star Badge Unlocked
        </p>
      </div>

      <div className="bg-blue-50 rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">
          📈 Progress Update
        </h2>

        <p className="text-lg">
          Alphabet Adventure Completed ✅
        </p>

        <p className="text-lg">
          Level Updated Automatically 🚀
        </p>
      </div>

      <button
        onClick={() => navigate("/tiny-world")}
        className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold"
      >
        Back to Tiny Explorer 🌟
      </button>

    </div>
  </div>
);
};

export default AlphabetLesson;