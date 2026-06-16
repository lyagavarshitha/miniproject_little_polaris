const User = require("../models/User");

const getAgeBasedGames = (age) => {
  if (age <= 7) {
    return [
      { name: "Alphabet Pop", cost: 50 },
      { name: "Color Catch", cost: 60 },
      { name: "Shape Puzzle", cost: 70 },
      { name: "Memory Match", cost: 80 },
      { name: "Word Highway Racer", cost: 90 },
    ];
  }

  if (age <= 12) {
    return [
      { name: "Treasure Hunt", cost: 120 },
      { name: "Math Quest", cost: 130 },
      { name: "Word Builder", cost: 140 },
      { name: "Puzzle World", cost: 150 },
      { name: "Quiz Battle", cost: 160 },
    ];
  }

  return [
    { name: "Logic Arena", cost: 180 },
    { name: "Code Challenge", cost: 200 },
    { name: "Brain Battle", cost: 220 },
    { name: "Strategy Escape", cost: 240 },
    { name: "Quiz Arena", cost: 260 },
  ];
};

const getGames = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const games = getAgeBasedGames(user.age);

    res.json(games);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const unlockGame = async (req, res) => {
  try {
    const { userId, gameName } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    console.log("========== DEBUG ==========");
    console.log("User ID:", userId);
    console.log("Game Name:", gameName);
    console.log("Coins In DB:", user.coins);
    console.log("Unlocked:", user.unlockedGames);
    console.log("===========================");

    const games = getAgeBasedGames(user.age);

    const game = games.find(
      (g) => g.name.trim() === gameName.trim()
    );

    console.log("Found Game:", game);

    if (!game) {
      return res.status(404).json({
        message: "Game not found",
      });
    }

    if (
      user.unlockedGames &&
      user.unlockedGames.includes(gameName)
    ) {
      return res.json({
        message: "Already unlocked 😎",
        coins: user.coins,
        unlockedGames: user.unlockedGames,
      });
    }

    const userCoins = Number(user.coins);
    const gameCost = Number(game.cost);

    console.log(
      "Comparing:",
      userCoins,
      "<",
      gameCost
    );

    if (userCoins < gameCost) {
      return res.status(400).json({
        message: "Not enough coins 😢",
      });
    }

    user.coins = userCoins - gameCost;

    if (!user.unlockedGames) {
      user.unlockedGames = [];
    }

    user.unlockedGames.push(gameName);

    await user.save();

    res.json({
      message:
        "Game unlocked successfully! 🎮",
      coins: user.coins,
      unlockedGames:
        user.unlockedGames,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getGames,
  unlockGame,
};