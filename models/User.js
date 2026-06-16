const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "parent", "admin"],
      default: "student",
    },

    age: {
      type: Number,
      required: function () {
        return this.role === "student";
      },
    },

    // Rewards System
    coins: {
      type: Number,
      default: 100,
    },

    streak: {
      type: Number,
      default: 0,
    },

    badges: {
      type: [String],
      default: [],
    },

    level: {
      type: Number,
      default: 1,
    },

    xp: {
      type: Number,
      default: 0,
    },

    // Learning Progress
    completedLessons: {
      type: [String],
      default: [],
    },

    lessonProgress: {
      type: Number,
      default: 0,
    },

    // Chores
    completedChores: {
      type: [String],
      default: [],
    },

    chorePoints: {
      type: Number,
      default: 0,
    },

    // Games
    unlockedGames: {
      type: [String],
      default: [],
    },

    gameScores: [
      {
        gameName: String,
        score: Number,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Parent - Child Linking
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Profile
    avatar: {
      type: String,
      default: "",
    },

    // Statistics
    totalLearningTime: {
      type: Number,
      default: 0,
    },

    totalStarsEarned: {
      type: Number,
      default: 0,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);