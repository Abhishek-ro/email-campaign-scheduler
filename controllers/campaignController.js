
const Campaign = require("../models/Campaign");
exports.createCampaign = async (req, res) => {
  const { userId, campaignName, scheduledTime, emailsToSend } = req.body;
  if (
    !userId ||
    !campaignName ||
    !scheduledTime ||
    !emailsToSend ||
    !Array.isArray(emailsToSend) ||
    emailsToSend.length === 0
  ) {
    return res
      .status(400)
      .json({
        message:
          "Please provide all required campaign details: userId, campaignName, scheduledTime, and a list of emailsToSend.",
      });
  }

  try {
    const newCampaign = new Campaign({
      userId,
      campaignName,
      scheduledTime: new Date(scheduledTime),
      emailsToSend,
    });

    const campaign = await newCampaign.save({validateBeforeSave:false});
    res.status(201).json(campaign);
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

