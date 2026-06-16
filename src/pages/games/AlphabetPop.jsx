import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
];

const AlphabetPop = () => {
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(30);
  const [combo, setCombo] = useState(0);

  const [gameOver, setGameOver] =
    useState(false);

  const [targetLetter, setTargetLetter] =
    useState("A");

  const [balloons, setBalloons] =
    useState([]);
    useEffect(() => {
  generateBalloons();
}, [targetLetter]);

useEffect(() => {
  if (gameOver) return;

  const interval = setInterval(() => {
    setTimer((prev) => {
      if (prev <= 1) {
        finishGame();
        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [gameOver]);

useEffect(() => {
  if (lives <= 0) {
    finishGame();
  }
}, [lives]);

const generateBalloons = () => {
  const arr = [];

  arr.push(targetLetter);

  while (arr.length < 8) {
    const random =
      LETTERS[
        Math.floor(
          Math.random() * LETTERS.length
        )
      ];

    arr.push(random);
  }

  arr.push("⭐");
  arr.push("💣");

  setBalloons(
    arr.sort(() => Math.random() - 0.5)
  );
};

const nextTarget = () => {
  const random =
    LETTERS[
      Math.floor(
        Math.random() * LETTERS.length
      )
    ];

  setTargetLetter(random);
};

const popBalloon = (item) => {

  if (item === targetLetter) {

    setScore((prev) => prev + 10);

    setCombo((prev) => prev + 1);

    confetti({
      particleCount: 20,
      spread: 50,
    });

    nextTarget();
  }

  else if (item === "⭐") {

    setScore((prev) => prev + 25);

  }

  else if (item === "💣") {

    setLives((prev) => prev - 1);

    setCombo(0);

  }

  else {

    setLives((prev) => prev - 1);

    setCombo(0);

  }
};

const finishGame = () => {

  confetti({
    particleCount: 300,
    spread: 180,
  });

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const updatedUser = {
    ...user,
    coins:
      (user.coins || 0) + score,
    xp:
      (user.xp || 0) +
      Math.floor(score / 2),
  };

  localStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
  );

  setGameOver(true);
};
if (gameOver) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-yellow-100 p-6">

      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-xl">

        <h1 className="text-5xl font-bold mb-6">
          🎉 Game Over!
        </h1>

        <div className="text-6xl mb-6">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-3xl mb-6">
          Score: {score}
        </p>

        <p className="text-2xl mb-4">
          🔥 Best Combo: {combo}
        </p>

        <button
          onClick={() =>
            navigate("/student/games")
          }
          className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold"
        >
          Back To Games 🎮
        </button>

      </div>

    </div>
  );
}

return (
  <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 p-8">

    <div className="max-w-6xl mx-auto">

      <div className="flex justify-between mb-8 text-3xl font-bold">

        <div>
          ❤️ {lives}
        </div>

        <div>
          ⭐ {score}
        </div>

        <div>
          🔥 x{combo}
        </div>

        <div>
          ⏰ {timer}s
        </div>

      </div>

      <div className="text-center mb-10">

        <h1 className="text-6xl font-bold mb-4">
          🎈 Alphabet Pop Deluxe
        </h1>

        <p className="text-3xl">
          Pop Letter
        </p>

        <div className="text-8xl font-bold text-pink-600 mt-4">
          {targetLetter}
        </div>

      </div>

     <div className="relative w-full h-[600px]">

  {balloons.map((item, index) => (

    <button
      key={index}
      onClick={() => popBalloon(item)}
      className="
        absolute
        w-28
        h-28
        rounded-full
        text-5xl
        font-bold
        text-white
        shadow-2xl
        hover:scale-125
        transition-all
        duration-300
        animate-bounce
      "
      style={{
        left: `${Math.random() * 80}%`,
        top: `${Math.random() * 80}%`,
        background:
          item === "💣"
            ? "#ef4444"
            : item === "⭐"
            ? "#facc15"
            : "#ec4899",
      }}
    >
      {item}
    </button>

  ))}

</div>
    </div>

  </div>
);
};

export default AlphabetPop;