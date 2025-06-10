
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");


const campaignRoutes = require("./routes/campaignRoutes");
const leadRoutes = require("./routes/leadRoutes");


const startScheduler = require("./scheduler/campaignScheduler");

const app = express();
const PORT = process.env.PORT || 5000


app.use(express.json());


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "Error: MONGODB_URI is not defined!!!!"
  );
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
   
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      startScheduler(); 
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });


app.use("/api/campaigns", campaignRoutes);
app.use("/api/leads", leadRoutes);


app.get("/", (req, res) => {
  res.send("Email Campaign Scheduler API is running!");
});
