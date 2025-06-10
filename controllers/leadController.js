
const Lead = require("../models/Lead");


exports.getLeadsByUser = async (req, res) => {
  try {
    const { userId } = req.params; 

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const leads = await Lead.find({ userId: userId });
    res.status(200).json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.createLead = async (req, res) => {
  const { userId, email, name } = req.body;

  if (!userId || !email) {
    return res
      .status(400)
      .json({ message: "User ID and email are required to create a lead." });
  }

  try {
    const newLead = new Lead({ userId, email, name });
    const lead = await newLead.save();
    res.status(201).json(lead);
  } catch (error) {
    if (error.code === 11000) {
      
      return res
        .status(409)
        .json({
          message: "A lead with this email already exists for this user.",
        });
    }
    console.error("Error creating lead:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

