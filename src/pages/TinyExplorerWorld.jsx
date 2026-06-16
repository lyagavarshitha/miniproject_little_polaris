import React from "react";
import { useNavigate } from "react-router-dom";

const TinyExplorerWorld = () => {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const completed =
    user.completedLessons || [];

  const stars =
    user.lessonStars || {};

  const level =
    Math.floor((user.xp || 0) / 100) + 1;

  const progress =
    (user.xp || 0) % 100;

  const lessons = [
    {
      title: "Alphabet Adventure 🔤",
      icon: "🔤",
      route: "/lessons/alphabet",
      completed: completed.includes("alphabet"),
      stars: stars.alphabet || 0,
      unlocked: true,
      color: "from-pink-400 to-purple-400",
    },

    {
      title: "Number Treasure Hunt 🔢",
      icon: "🔢",
      route: "/lessons/numbers",
      completed: completed.includes("numbers"),
      stars: stars.numbers || 0,
      unlocked: true,
      color: "from-yellow-400 to-orange-400",
    },

    {
      title: "Color Catch 🌈",
      icon: "🌈",
      route: "/lessons/colors",
      completed: completed.includes("colors"),
      stars: stars.colors || 0,
      unlocked: true,
      color: "from-cyan-400 to-blue-400",
    },

    {
      title: "Shape Builder 🔺",
      icon: "🔺",
      route: "/lessons/shapes",
      completed: completed.includes("shapes"),
      stars: stars.shapes || 0,
      unlocked: completed.includes("colors"),
      color: "from-green-400 to-emerald-400",
    },

    {
      title: "Animal Sounds Safari 🐶",
      icon: "🐶",
      route: "/lessons/animals",
      completed: completed.includes("animals"),
      stars: stars.animals || 0,
      unlocked: completed.includes("shapes"),
      color: "from-orange-400 to-red-400",
    },

    {
      title: "Good Habits Hero 🪥",
      icon: "🪥",
      route: "/lessons/habits",
      completed: completed.includes("habits"),
      stars: stars.habits || 0,
      unlocked: completed.includes("animals"),
      color: "from-indigo-400 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-[40px] shadow-2xl p-8 mb-8">

          <div className="flex flex-col md:flex-row justify-between items-center">

            <div>
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-3">
                🌟 Tiny Explorer World
              </h1>

              <p className="text-xl text-gray-600">
                Welcome back Explorer!
              </p>
            </div>

            <div className="text-[100px] animate-bounce">
              🐧
            </div>

          </div>

        </div>

        {/* Level Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">
            ⭐ Level {level}
          </h2>

          <div className="w-full bg-gray-200 rounded-full h-5">

            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-5 rounded-full"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="mt-3 font-semibold">
            {progress}/100 XP
          </p>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
            <div className="text-5xl mb-2">💰</div>
            <h2 className="font-bold text-xl">Coins</h2>
            <p className="text-4xl font-bold text-yellow-500">
              {user.coins || 0}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
            <div className="text-5xl mb-2">⭐</div>
            <h2 className="font-bold text-xl">XP</h2>
            <p className="text-4xl font-bold text-blue-500">
              {user.xp || 0}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
            <div className="text-5xl mb-2">🏅</div>
            <h2 className="font-bold text-xl">Badges</h2>
            <p className="text-4xl font-bold text-purple-500">
              {user.badges?.length || 0}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
            <div className="text-5xl mb-2">📚</div>
            <h2 className="font-bold text-xl">Lessons</h2>
            <p className="text-4xl font-bold text-green-500">
              {completed.length}
            </p>
          </div>

        </div>

        {/* Badge Gallery */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-10">

          <h2 className="text-3xl font-bold mb-4">
            🏆 Badge Collection
          </h2>

          <div className="flex flex-wrap gap-4">

            {user.badges?.length ? (
              user.badges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-yellow-100 px-5 py-3 rounded-full font-bold"
                >
                  🏅 {badge}
                </div>
              ))
            ) : (
              <p>No badges yet!</p>
            )}

          </div>

        </div>

        {/* Lessons */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {lessons.map((lesson, index) => (
            <div
              key={index}
              className={`rounded-[35px] shadow-2xl p-8 text-white bg-gradient-to-br ${lesson.color} transition hover:scale-105`}
            >

              <div className="text-6xl mb-6">
                {lesson.icon}
              </div>

              <h2 className="text-3xl font-bold mb-4">
                {lesson.title}
              </h2>

              {lesson.completed ? (
                <>
                  <p className="text-xl font-bold mb-3">
                    ⭐ {lesson.stars}/5 Stars
                  </p>

                  <div className="w-full bg-white/30 rounded-full h-4">
                    <div
                      className="bg-white h-4 rounded-full"
                      style={{
                        width: `${lesson.stars * 20}%`,
                      }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-xl mb-4">
                  {lesson.unlocked
                    ? "🚀 Ready to Play"
                    : "🔒 Complete Previous Lesson"}
                </p>
              )}

              <button
                disabled={!lesson.unlocked}
                onClick={() =>
                  navigate(lesson.route)
                }
                className={`mt-6 px-8 py-4 rounded-full text-xl font-bold ${
                  lesson.unlocked
                    ? "bg-white text-black"
                    : "bg-white/30 cursor-not-allowed"
                }`}
              >
                {lesson.unlocked
                  ? "Play Lesson 🎮"
                  : "Locked 🔒"}
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default TinyExplorerWorld;