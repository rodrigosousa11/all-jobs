const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

router.get("/jobs", jobController.arbeitnow);
router.get("/jobs/:slug", jobController.arbeitnowOnlyOne);
router.get("/2jobs", jobController.devitjobs_plus_arbeitjobs);
router.get("/2jobs/:slug", jobController.devitjobs_plus_arbeitjobsOnlyOne);

module.exports = router;