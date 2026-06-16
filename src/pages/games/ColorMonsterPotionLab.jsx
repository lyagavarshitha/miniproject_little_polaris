import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

const levels = [
  {
    target: "GREEN",
    color: "green",
    emotion: "😭",
    message: "I lost my GREEN color!",
    answer: ["blue", "yellow"],
  },
  {
    target: "ORANGE",
    color: "orange",
    emotion: "😡",
    message: "Make me ORANGE NOW!",
    answer: ["red", "yellow"],
  },
  {
    target: "PURPLE",
    color: "purple",
    emotion: "🤪",
    message: "I want PURPLE!",
    answer: ["red", "blue"],
  },
  {
    target: "GREEN",
    color: "green",
    emotion: "😴",
    message: "A sleepy GREEN potion...",
    answer: ["blue", "yellow"],
  },
  {
    target: "ORANGE",
    color: "orange",
    emotion: "🥶",
    message: "Warm me up with ORANGE!",
    answer: ["red", "yellow"],
  },
];

const ColorMonsterPotionLab = () => {
  const navigate = useNavigate();

  const [level, setLevel] = useState(0);

  const [score, setScore] = useState(0);

  const [lives, setLives] = useState(3);

  const [timer, setTimer] = useState(60);

  const [selectedPotions, setSelectedPotions] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [monsterColor, setMonsterColor] =
    useState("#8b5cf6");

  const [gameOver, setGameOver] =
    useState(false);

  const [victory, setVictory] =
    useState(false);

  const currentLevel =
    levels[level];

  useEffect(() => {
    if (gameOver || victory) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () =>
      clearInterval(interval);
  }, [gameOver, victory]);

  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
    }
  }, [lives]);
    const addPotion = (color) => {
    if (selectedPotions.length >= 2)
      return;

    setSelectedPotions([
      ...selectedPotions,
      color,
    ]);
  };

  const resetCauldron = () => {
    setSelectedPotions([]);
  };

  const brewPotion = () => {
    if (selectedPotions.length !== 2) {
      setMessage(
        "⚠️ Choose 2 potions first!"
      );
      return;
    }

    const playerMix =
      [...selectedPotions]
        .sort()
        .join("-");

    const correctMix =
      [...currentLevel.answer]
        .sort()
        .join("-");

    if (playerMix === correctMix) {

      setScore(
        (prev) => prev + 20
      );

      setMonsterColor(
        currentLevel.color
      );

      setMessage(
        `🎉 Awesome! ${currentLevel.target} Potion Created!`
      );

      confetti({
        particleCount: 80,
        spread: 100,
      });

      setTimeout(() => {

        if (
          level <
          levels.length - 1
        ) {
          setLevel(
            (prev) => prev + 1
          );

          setSelectedPotions([]);

          setMessage("");
        }

        else {
          finishGame();
        }

      }, 1500);

    } else {

      setLives(
        (prev) => prev - 1
      );

      setMessage(
        "💥 Wrong Potion! Monster is upset!"
      );

      setSelectedPotions([]);
    }
  };

  const finishGame = () => {

    confetti({
      particleCount: 300,
      spread: 180,
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
        (user.coins || 0) + 100,
      xp:
        (user.xp || 0) + 50,
    };

    if (!updatedUser.badges)
      updatedUser.badges = [];

    if (
      !updatedUser.badges.includes(
        "Potion Master"
      )
    ) {
      updatedUser.badges.push(
        "Potion Master"
      );
    }

    localStorage.setItem(
      "user",
      JSON.stringify(
        updatedUser
      )
    );

    setVictory(true);
  };
    if (victory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-yellow-100 p-6">

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-xl">

          <h1 className="text-5xl font-bold mb-6">
            🏆 Potion Master!
          </h1>

          <div className="text-8xl mb-6">
            🌈
          </div>

          <p className="text-2xl mb-4">
            Final Score: {score}
          </p>

          <div className="bg-yellow-50 rounded-2xl p-6 mb-6">

            <p className="text-green-600 text-xl">
              💰 +100 Coins
            </p>

            <p className="text-blue-600 text-xl">
              ⭐ +50 XP
            </p>

            <p className="text-purple-600 text-xl">
              🏅 Potion Master Badge
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/student/games")
            }
            className="px-8 py-4 rounded-full bg-purple-600 text-white text-xl font-bold"
          >
            Back To Games 🎮
          </button>

        </div>

      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 p-6">

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

          <h1 className="text-5xl font-bold mb-6">
            💀 Game Over
          </h1>

          <p className="text-2xl mb-6">
            Score: {score}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="px-8 py-4 rounded-full bg-red-500 text-white text-xl font-bold"
          >
            Try Again 🔄
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div className="text-3xl">
            ❤️ {lives}
          </div>

          <div className="text-3xl">
            ⭐ {score}
          </div>

          <div className="text-3xl">
            ⏰ {timer}
          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center mb-8">

          <div
            className="w-56 h-56 rounded-full mx-auto flex items-center justify-center text-8xl shadow-2xl transition-all duration-500"
            style={{
              backgroundColor:
                monsterColor,
            }}
          >
            {currentLevel.emotion}
          </div>

          <h2 className="text-4xl font-bold mt-6">
            {currentLevel.message}
          </h2>

          <p className="text-3xl mt-4 text-purple-700 font-bold">
            Make: {currentLevel.target}
          </p>

        </div>

        <div className="grid grid-cols-3 gap-6 mb-10">

          <button
            onClick={() =>
              addPotion("red")
            }
            className="bg-red-500 text-white rounded-3xl p-8 text-3xl font-bold hover:scale-110 transition"
          >
            🧪 Red
          </button>

          <button
            onClick={() =>
              addPotion("blue")
            }
            className="bg-blue-500 text-white rounded-3xl p-8 text-3xl font-bold hover:scale-110 transition"
          >
            🧪 Blue
          </button>

          <button
            onClick={() =>
              addPotion("yellow")
            }
            className="bg-yellow-400 rounded-3xl p-8 text-3xl font-bold hover:scale-110 transition"
          >
            🧪 Yellow
          </button>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

          <h2 className="text-4xl font-bold mb-4">
            🫕 Magic Cauldron
          </h2>

          <div className="text-8xl mb-4 animate-bounce">
            🫕
          </div>

          <div className="text-2xl mb-6 font-bold">

            {selectedPotions.length > 0
              ? selectedPotions.join(
                  " + "
                )
              : "✨ Empty Potion ✨"}

          </div>

          <div className="flex justify-center gap-4">

            <button
              onClick={brewPotion}
              className="bg-purple-600 text-white px-8 py-4 rounded-full text-2xl font-bold hover:scale-110 transition"
            >
              ✨ BREW
            </button>

            <button
              onClick={resetCauldron}
              className="bg-gray-500 text-white px-8 py-4 rounded-full text-2xl font-bold hover:scale-110 transition"
            >
              🗑 Clear
            </button>

          </div>

          {message && (
            <div className="mt-6 text-2xl font-bold text-purple-700">
              {message}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ColorMonsterPotionLab;