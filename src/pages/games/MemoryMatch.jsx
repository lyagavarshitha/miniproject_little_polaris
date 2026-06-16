import React, {
  useState,
  useEffect,
} from "react";

import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

const emojis = [
  "🐶","🐶",
  "🐱","🐱",
  "🐰","🐰",
  "🦁","🦁",
  "🐸","🐸",
  "🐵","🐵",
  "🐼","🐼",
  "🦊","🦊",
];

const shuffleCards = () => {
  return [...emojis]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }));
};

const MemoryMatch = () => {
  const navigate = useNavigate();

  const [cards, setCards] =
    useState(shuffleCards());

  const [selected, setSelected] =
    useState([]);

  const [moves, setMoves] =
    useState(0);

  const [matches, setMatches] =
    useState(0);

  const [timer, setTimer] =
    useState(60);

  const [victory, setVictory] =
    useState(false);

  const [gameOver, setGameOver] =
    useState(false);

  useEffect(() => {
    if (victory || gameOver) return;

    const interval = setInterval(() => {
      setTimer((prev) => {

        if (prev <= 1) {
          clearInterval(interval);
          setGameOver(true);
          return 0;
        }

        return prev - 1;

      });
    }, 1000);

    return () =>
      clearInterval(interval);

  }, [victory, gameOver]);
    const handleCardClick = (
    card
  ) => {

    if (
      card.flipped ||
      card.matched ||
      selected.length === 2
    ) {
      return;
    }

    const updatedCards =
      cards.map((c) =>
        c.id === card.id
          ? {
              ...c,
              flipped: true,
            }
          : c
      );

    setCards(updatedCards);

    const newSelected = [
      ...selected,
      card,
    ];

    setSelected(newSelected);

    if (
      newSelected.length === 2
    ) {
      setMoves(
        (prev) => prev + 1
      );

      setTimeout(() => {
        checkMatch(
          newSelected
        );
      }, 800);
    }
  };

  const checkMatch = (
    selectedCards
  ) => {

    const [first, second] =
      selectedCards;

    if (
      first.emoji ===
      second.emoji
    ) {

      const updatedCards =
        cards.map((card) =>
          card.emoji ===
          first.emoji
            ? {
                ...card,
                matched: true,
              }
            : card
        );

      setCards(updatedCards);

      const newMatches =
        matches + 1;

      setMatches(newMatches);

      if (
        newMatches === 8
      ) {
        winGame();
      }

    } else {

      const updatedCards =
        cards.map((card) =>
          card.id === first.id ||
          card.id === second.id
            ? {
                ...card,
                flipped: false,
              }
            : card
        );

      setCards(updatedCards);

    }

    setSelected([]);
  };
    const winGame = () => {

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

    user.coins =
      (user.coins || 0) + 80;

    user.xp =
      (user.xp || 0) + 40;

    if (!user.badges) {
      user.badges = [];
    }

    if (
      !user.badges.includes(
        "Memory Master"
      )
    ) {
      user.badges.push(
        "Memory Master"
      );
    }

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setVictory(true);
  };

  const restartGame = () => {

    setCards(
      shuffleCards()
    );

    setSelected([]);
    setMoves(0);
    setMatches(0);
    setTimer(60);

    setVictory(false);
    setGameOver(false);
  };
    if (victory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-100">

        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">

          <h1 className="text-5xl font-bold mb-4">
            🏆 Memory Master!
          </h1>

          <div className="text-8xl mb-4">
            🎉
          </div>

          <p className="text-2xl">
            Moves: {moves}
          </p>

          <button
            onClick={() =>
              navigate(
                "/student/games"
              )
            }
            className="mt-6 bg-purple-600 text-white px-8 py-4 rounded-full"
          >
            Back 🎮
          </button>

        </div>

      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">

        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">

          <h1 className="text-5xl font-bold">
            ⏰ Time Up!
          </h1>

          <button
            onClick={
              restartGame
            }
            className="mt-6 bg-red-500 text-white px-8 py-4 rounded-full"
          >
            Play Again
          </button>

        </div>

      </div>
    );
  }
    return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 flex justify-between">

          <h2 className="text-2xl font-bold">
            ⏰ {timer}
          </h2>

          <h2 className="text-2xl font-bold">
            🎯 {matches}/8
          </h2>

          <h2 className="text-2xl font-bold">
            🔄 {moves}
          </h2>

        </div>

        <div className="grid grid-cols-4 gap-4">

          {cards.map((card) => (

            <div
              key={card.id}
              onClick={() =>
                handleCardClick(
                  card
                )
              }
              className="h-32 cursor-pointer hover:scale-105 transition-all"
              style={{
                perspective:
                  "1000px",
              }}
            >

              <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                  transformStyle:
                    "preserve-3d",

                  transform:
                    card.flipped ||
                    card.matched
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)",
                }}
              >

                <div
                  className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-xl flex items-center justify-center text-5xl text-white"
                  style={{
                    backfaceVisibility:
                      "hidden",
                  }}
                >
                  ❓
                </div>

                <div
                  className={`absolute w-full h-full rounded-3xl shadow-xl flex items-center justify-center text-5xl ${
                    card.matched
                      ? "bg-green-100 ring-4 ring-green-400"
                      : "bg-white"
                  }`}
                  style={{
                    backfaceVisibility:
                      "hidden",

                    transform:
                      "rotateY(180deg)",
                  }}
                >
                  {card.emoji}
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default MemoryMatch;