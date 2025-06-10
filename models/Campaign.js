
const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    userId: {
      type: String, 
      required: true,
    },
    campaignName: {
      type: String,
      required: true,
    },
    scheduledTime: {
      type: Date,
      required: true,
    },
    emailsToSend: {
      type: [String], 
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    sentAt: {
      type: Date, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
