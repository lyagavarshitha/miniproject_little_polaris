import React, { useEffect, useState } from "react";
import API from "../services/api";

const ChoresPage = () => {
  const [chores, setChores] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser) {
      fetchChores(storedUser._id);
    }
  }, []);

  const fetchChores = async (userId) => {
    try {
      const res = await API.get(`/chores/${userId}`);
      setChores(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const completeChore = async (choreId) => {
    try {
      const res = await API.post("/chores/complete", {
        choreId,
      });

      alert(res.data.message);

      const updatedUser = {
        ...user,
        coins: res.data.coins,
        streak: res.data.streak,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      fetchChores(user._id);
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef5ff] via-[#f7efff] to-[#edf7ff] p-10">
      <h1 className="text-5xl font-bold mb-10">
        🧹 Daily Chores
      </h1>

      <div className="space-y-5">
        {chores.map((chore) => (
          <div
            key={chore._id}
            className="bg-white rounded-3xl shadow-xl p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-bold">
                {chore.title}
              </h2>

              <p className="text-gray-500">
                Reward: {chore.reward} coins 💰
              </p>
            </div>

            <button
              onClick={() =>
                !chore.completed && completeChore(chore._id)
              }
              className={`px-6 py-3 rounded-full text-white font-semibold ${
                chore.completed
                  ? "bg-green-500"
                  : "bg-blue-600"
              }`}
            >
              {chore.completed ? "Completed ✅" : "Complete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoresPage;