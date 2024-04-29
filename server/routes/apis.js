const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

router.get("/jobs", jobController.arbeitnow);
router.get("/jobs/:slug", jobController.arbeitnowOnlyOne);
router.get("/devitjobs", jobController.devitjobs);

module.exports = router;