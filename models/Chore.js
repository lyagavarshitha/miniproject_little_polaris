const mongoose = require("mongoose");

const choreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    reward: {
      type: Number,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    lastResetDate: {
      type: String,
      default: () => new Date().toDateString(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chore", choreSchema);