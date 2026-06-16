const Chore = require("../models/Chore");
const User = require("../models/User");

const getAgeBasedChores = (age) => {
  if (age <= 7) {
    return [
      { title: "Brush Teeth 🪥", reward: 20 },
      { title: "Drink Water 💧", reward: 10 },
      { title: "Put Toys Away 🧸", reward: 25 },
      { title: "Read Picture Book 📚", reward: 30 },
      { title: "Say Thank You ❤️", reward: 15 },
    ];
  }

  if (age <= 12) {
    return [
      { title: "Finish Homework 📘", reward: 40 },
      { title: "Read 20 Minutes 📚", reward: 35 },
      { title: "Organize Desk 🧹", reward: 25 },
      { title: "Water Plants 🌱", reward: 20 },
      { title: "Help Parents 🍽️", reward: 45 },
    ];
  }

  return [
    { title: "Study 30 Minutes 🧠", reward: 50 },
    { title: "Exercise 20 Minutes 💪", reward: 40 },
    { title: "Clean Room 🛏️", reward: 35 },
    { title: "Help Family ❤️", reward: 45 },
    { title: "Practice Coding 💻", reward: 60 },
  ];
};

const getChores = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let chores = await Chore.find({ userId });

    const today = new Date().toDateString();

    if (chores.length === 0) {
      const defaultChores = getAgeBasedChores(user.age);

      const createdChores = defaultChores.map((chore) => ({
        userId,
        title: chore.title,
        reward: chore.reward,
        completed: false,
        lastResetDate: today,
      }));

      await Chore.insertMany(createdChores);

      chores = await Chore.find({ userId });
    } else {
      const needsReset = chores.some(
        (chore) => chore.lastResetDate !== today
      );

      if (needsReset) {
        for (let chore of chores) {
          chore.completed = false;
          chore.lastResetDate = today;
          await chore.save();
        }
      }

      chores = await Chore.find({ userId });
    }

    res.json(chores);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const completeChore = async (req, res) => {
  try {
    const { choreId } = req.body;

    const chore = await Chore.findById(choreId);

    if (!chore) {
      return res.status(404).json({
        message: "Chore not found",
      });
    }

    if (chore.completed) {
      return res.status(400).json({
        message: "Already completed today 😎",
      });
    }

    chore.completed = true;
    await chore.save();

    const user = await User.findById(chore.userId);

    user.coins += chore.reward;
    user.streak += 1;

    await user.save();

    res.json({
      message: "Chore completed! 🎉",
      coins: user.coins,
      streak: user.streak,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getChores,
  completeChore,
};