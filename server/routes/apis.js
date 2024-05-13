const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

router.get("/jobs", jobController.devitjobs_plus_arbeitjobs);
router.get("/jobs/:slug", jobController.devitjobs_plus_arbeitjobsOnlyOne);

module.exports = router;