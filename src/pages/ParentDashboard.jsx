import React from "react";

const ParentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-8 shadow-xl mb-8">

          <h1 className="text-5xl font-bold">
            👨‍👩‍👧 Parent Dashboard
          </h1>

          <p className="text-xl mt-2">
            Monitor Learning • Rewards • Progress
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
            <h2 className="text-5xl">⭐</h2>
            <p className="text-3xl font-bold mt-2">250</p>
            <p>Total XP</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
            <h2 className="text-5xl">💰</h2>
            <p className="text-3xl font-bold mt-2">320</p>
            <p>Coins</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
            <h2 className="text-5xl">🏅</h2>
            <p className="text-3xl font-bold mt-2">8</p>
            <p>Badges</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
            <h2 className="text-5xl">🔥</h2>
            <p className="text-3xl font-bold mt-2">7</p>
            <p>Day Streak</p>
          </div>

        </div>

        {/* Child Profile */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            👧 Child Profile
          </h2>

          <div className="flex items-center gap-6">

            <div className="text-8xl">
              🧒
            </div>

            <div>

              <h3 className="text-3xl font-bold">
                Little Explorer
              </h3>

              <p className="text-lg">
                Level 5
              </p>

              <p className="text-lg">
                XP: 250
              </p>

            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            📚 Learning Progress
          </h2>

          <div className="space-y-6">

            <div>
              <div className="flex justify-between">
                <span>Alphabet</span>
                <span>90%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div className="bg-green-500 h-4 rounded-full w-[90%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span>Numbers</span>
                <span>80%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div className="bg-blue-500 h-4 rounded-full w-[80%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span>Shapes</span>
                <span>75%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div className="bg-purple-500 h-4 rounded-full w-[75%]"></div>
              </div>
            </div>

          </div>

        </div>

        {/* Two Column */}

        <div className="grid md:grid-cols-2 gap-8">

          {/* Achievements */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              🏆 Achievements
            </h2>

            <div className="space-y-4">

              <div className="bg-yellow-100 p-4 rounded-xl">
                🥇 Highway Champion
              </div>

              <div className="bg-pink-100 p-4 rounded-xl">
                🧠 Memory Master
              </div>

              <div className="bg-blue-100 p-4 rounded-xl">
                🌈 Color Wizard
              </div>

            </div>

          </div>

          {/* Parent Controls */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              ⚙️ Parent Controls
            </h2>

            <div className="grid gap-4">

              <button className="bg-green-500 text-white py-3 rounded-xl text-xl font-bold">
                💰 Give Coins
              </button>

              <button className="bg-blue-500 text-white py-3 rounded-xl text-xl font-bold">
                📝 Assign Chore
              </button>

              <button className="bg-purple-500 text-white py-3 rounded-xl text-xl font-bold">
                🎯 Daily Goal
              </button>

              <button className="bg-pink-500 text-white py-3 rounded-xl text-xl font-bold">
                ⏰ Screen Time
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ParentDashboard;