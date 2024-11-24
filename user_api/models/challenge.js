const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa schema cho Challenge
const challengeSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    difficultyLevel: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    scoringCriteria: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", challengeSchema);
