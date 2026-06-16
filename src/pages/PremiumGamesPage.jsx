import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const PremiumGamesPage = () => {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (storedUser) {
      setUser(storedUser);
      fetchGames(storedUser._id);
    }
  }, []);

  const fetchGames = async (userId) => {
    try {
      const res = await API.get(
        `/games?userId=${userId}`
      );

      setGames(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const unlockGame = async (gameName) => {
    try {
      const res = await API.post(
        "/games/unlock",
        {
          userId: user._id,
          gameName,
        }
      );

      const updatedUser = {
        ...user,
        coins: res.data.coins,
        unlockedGames:
          res.data.unlockedGames,
      };

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      alert(res.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error unlocking game"
      );
    }
  };

  const gameIcons = {
    "Alphabet Pop": "🔤",
    "Color Catch": "🌈",
    "Shape Puzzle": "🏴‍☠️",
    "Memory Match": "🧠",
    "Word Highway Racer": "🏎️",
  };

  const playGame = (gameName) => {
    if (gameName.includes("Alphabet Pop")) {
      navigate("/games/alphabet-pop");
      return;
    }

    if (gameName.includes("Color Catch")) {
      navigate("/games/color-monster");
      return;
    }

    if (gameName.includes("Shape Puzzle")) {
navigate("/games/shape-magic-factory");
      return;
    }

    if (gameName.includes("Memory Match")) {
      navigate("/games/memory-match");
      return;
    }

    if (gameName.includes("Word Highway Racer")) {
      navigate("/games/word-highway-racer");
      return;
    }

    alert(`Unknown Game: ${gameName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-3xl p-8 mb-8 shadow-xl">

          <h1 className="text-5xl font-bold mb-2">
            🎮 Premium Games Arena
          </h1>

          <p className="text-xl">
            Play • Learn • Earn Rewards
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="text-center">

            <h2 className="text-3xl">
              💰
            </h2>

            <p className="font-bold">
              {user?.coins || 0}
            </p>

            <p>Coins</p>

          </div>

          <div className="text-center">

            <h2 className="text-3xl">
              ⭐
            </h2>

            <p className="font-bold">
              {user?.xp || 0}
            </p>

            <p>XP</p>

          </div>

          <div className="text-center">

            <h2 className="text-3xl">
              🏅
            </h2>

            <p className="font-bold">
              {user?.badges?.length || 0}
            </p>

            <p>Badges</p>

          </div>

          <div className="text-center">

            <h2 className="text-3xl">
              🎮
            </h2>

            <p className="font-bold">
              {user?.unlockedGames?.length || 0}
            </p>

            <p>Unlocked</p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {games.map((game) => {

            const unlocked =
              user?.unlockedGames?.includes(
                game.name
              );

            return (

              <div
                key={game.name}
                className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition-all duration-300"
              >

                <div className="text-5xl mb-4">
                  {gameIcons[game.name] || "🎮"}
                </div>

                <h2 className="text-2xl font-bold mb-2">
                  {game.name}
                </h2>

                <p className="text-gray-600 mb-4">
                  💰 Cost: {game.cost} Coins
                </p>

                <button
                  onClick={() => {

                    if (unlocked) {
                      playGame(game.name);
                    } else {
                      unlockGame(game.name);
                    }

                  }}
                  className={`w-full py-3 rounded-full text-white font-bold ${
                    unlocked
                      ? "bg-green-500"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >

                  {unlocked
                    ? "Play 🎮"
                    : "Unlock 🔓"}

                </button>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
};

export default PremiumGamesPage;