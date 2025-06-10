
const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadController");

router.get("/:userId", leadController.getLeadsByUser);
router.post("/", leadController.createLead);

module.exports = router;
