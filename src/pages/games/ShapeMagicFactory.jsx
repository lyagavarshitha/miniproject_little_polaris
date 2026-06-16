import React, {
  useState,
  useEffect,
} from "react";

import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

const ShapeTreasureRush = () => {

  const navigate = useNavigate();

  const [cartX, setCartX] =
    useState(45);

  const [objects, setObjects] =
    useState([]);

  const [score, setScore] =
    useState(0);

  const [lives, setLives] =
    useState(3);

  const [timer, setTimer] =
    useState(60);

  const [gameOver, setGameOver] =
    useState(false);

  const [victory, setVictory] =
    useState(false);

  const targetShape = "🔺";
  const goal = 15;

  useEffect(() => {

    const handleKeyDown = (e) => {

      if (
        e.key === "ArrowLeft"
      ) {

        setCartX((prev) =>
          Math.max(0, prev - 5)
        );

      }

      if (
        e.key === "ArrowRight"
      ) {

        setCartX((prev) =>
          Math.min(
            90,
            prev + 5
          )
        );

      }

    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

  }, []);

  useEffect(() => {

    const spawnInterval =
      setInterval(() => {

        const items = [
          "🔺",
          "⭕",
          "⬜",
          "💣",
        ];

        const randomItem =
          items[
            Math.floor(
              Math.random() *
                items.length
            )
          ];

        const newObject = {
          id:
            Date.now() +
            Math.random(),

          emoji:
            randomItem,

          x:
            Math.random() *
            90,

          y: 0,
        };

        setObjects((prev) => [
          ...prev,
          newObject,
        ]);

      }, 800);

    return () =>
      clearInterval(
        spawnInterval
      );

  }, []);

  useEffect(() => {

    const gameLoop =
      setInterval(() => {

        setObjects((prev) => {

          return prev
            .map((obj) => ({
              ...obj,
              y:
                obj.y + 3,
            }))
            .filter(
              (obj) =>
                obj.y < 100
            );

        });

      }, 80);

    return () =>
      clearInterval(
        gameLoop
      );

  }, []);

  useEffect(() => {

    const countdown =
      setInterval(() => {

        setTimer((prev) => {

          if (prev <= 1) {

            clearInterval(
              countdown
            );

            setGameOver(true);

            return 0;
          }

          return prev - 1;

        });

      }, 1000);

    return () =>
      clearInterval(
        countdown
      );

  }, []);
    useEffect(() => {

    const collisionLoop =
      setInterval(() => {

        setObjects((prev) => {

          const remaining = [];

          prev.forEach((obj) => {

            const caught =
              obj.y > 82 &&
              Math.abs(
                obj.x - cartX
              ) < 8;

            if (caught) {

              if (
                obj.emoji === "💣"
              ) {

                setGameOver(true);

                setLives(0);

                return;
              }

              if (
                obj.emoji ===
                targetShape
              ) {

                setScore(
                  (prevScore) =>
                    prevScore + 1
                );

              } else {

                setLives(
                  (prevLives) => {

                    const newLives =
                      prevLives - 1;

                    if (
                      newLives <= 0
                    ) {
                      setGameOver(
                        true
                      );
                    }

                    return newLives;
                  }
                );
              }

            } else {

              remaining.push(obj);

            }

          });

          return remaining;

        });

      }, 100);

    return () =>
      clearInterval(
        collisionLoop
      );

  }, [cartX]);

  useEffect(() => {

    if (score >= goal) {

      confetti({
        particleCount: 250,
        spread: 150,
      });

      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        ) || {};

      user.coins =
        (user.coins || 0) +
        100;

      user.xp =
        (user.xp || 0) +
        50;

      if (!user.badges)
        user.badges = [];

      if (
        !user.badges.includes(
          "Treasure Hunter"
        )
      ) {

        user.badges.push(
          "Treasure Hunter"
        );

      }

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      setVictory(true);

    }

  }, [score]);

  if (victory) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100">

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

          <h1 className="text-6xl font-bold mb-6">
            🏆 TREASURE FOUND!
          </h1>

          <div className="text-8xl mb-6">
            💰🏴‍☠️💰
          </div>

          <p className="text-3xl mb-4">
            Score: {score}
          </p>

          <p className="text-green-600 text-2xl">
            💰 +100 Coins
          </p>

          <p className="text-blue-600 text-2xl">
            ⭐ +50 XP
          </p>

          <p className="text-purple-600 text-2xl mb-6">
            🏅 Treasure Hunter Badge
          </p>

          <button
            onClick={() =>
              navigate(
                "/student/games"
              )
            }
            className="bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-bold"
          >
            Back To Games 🎮
          </button>

        </div>

      </div>
    );

  }

  if (gameOver) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

          <h1 className="text-6xl font-bold mb-6">
            💀 GAME OVER
          </h1>

          <div className="text-8xl mb-6">
            💣
          </div>

          <p className="text-3xl mb-6">
            Score: {score}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="bg-red-500 text-white px-8 py-4 rounded-full text-xl font-bold"
          >
            Play Again 🔄
          </button>

        </div>

      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-yellow-100 overflow-hidden relative">

      <div className="absolute top-4 left-4 text-2xl font-bold">
        ❤️ {lives}
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-2xl font-bold">
        ⏰ {timer}
      </div>

      <div className="absolute top-4 right-4 text-2xl font-bold">
        ⭐ {score}/{goal}
      </div>

      <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-xl text-2xl font-bold">

        Catch:
        <span className="ml-2 text-4xl">
          {targetShape}
        </span>

      </div>

      <div className="absolute right-6 top-28 text-8xl">
        💰
      </div>

      {objects.map((obj) => (

        <div
          key={obj.id}
          className="absolute text-6xl select-none"
          style={{
            left: `${obj.x}%`,
            top: `${obj.y}%`,
          }}
        >
          {obj.emoji}
        </div>

      ))}

      <div
        className="absolute bottom-6 text-8xl transition-all duration-100"
        style={{
          left: `${cartX}%`,
        }}
      >
        🏴‍☠️🛒
      </div>

      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-xl font-bold">

        ⬅️ Arrow Left & Arrow Right ➡️

      </div>

    </div>

  );
};

export default ShapeTreasureRush;