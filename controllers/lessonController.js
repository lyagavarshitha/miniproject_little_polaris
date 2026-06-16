const User = require("../models/User");

const getAgeBasedLessons = (age) => {
  if (age <= 7) {
    return [
      {
        id: "alphabet",
        title: "ABC Learning 🔤",
        reward: 40,
        xp: 20,
        badge: "Alphabet Star",
        content: "Learn A to Z and basic words.",
      },
      {
        id: "numbers",
        title: "Numbers 🔢",
        reward: 40,
        xp: 20,
        badge: "Number Hero",
        content: "Learn counting and basic numbers.",
      },
    ];
  }

  if (age <= 12) {
    return [
      {
        id: "addition",
        title: "Addition ➕",
        reward: 60,
        xp: 30,
        badge: "Math Wizard",
        content: "Learn addition and calculations.",
      },
      {
        id: "science",
        title: "Science 🔬",
        reward: 60,
        xp: 30,
        badge: "Science Explorer",
        content: "Learn basic science concepts.",
      },
    ];
  }

  return [
    {
      id: "coding",
      title: "Coding Basics 💻",
      reward: 100,
      xp: 50,
      badge: "Code Master",
      content: "Learn programming fundamentals.",
    },
  ];
};

const getLessons = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const lessons = getAgeBasedLessons(user.age);

    res.json(lessons);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const completeLesson = async (req, res) => {
  try {
    const { userId, lessonId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const lessons = getAgeBasedLessons(user.age);

    const lesson = lessons.find(
      (l) => l.id === lessonId
    );

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    if (
      user.completedLessons.includes(
        lessonId
      )
    ) {
      return res.json({
        message: "Lesson already completed",
      });
    }

    user.completedLessons.push(
      lessonId
    );

    user.coins += lesson.reward;

    user.xp += lesson.xp;

    if (
      !user.badges.includes(
        lesson.badge
      )
    ) {
      user.badges.push(
        lesson.badge
      );
    }

    const newLevel =
      Math.floor(user.xp / 100) + 1;

    user.level = newLevel;

    user.lessonProgress = Math.round(
      (user.completedLessons.length /
        lessons.length) *
        100
    );

    await user.save();

    res.json({
      message:
        "Lesson completed successfully!",
      coins: user.coins,
      xp: user.xp,
      level: user.level,
      badges: user.badges,
      progress:
        user.lessonProgress,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getLessons,
  completeLesson,
};