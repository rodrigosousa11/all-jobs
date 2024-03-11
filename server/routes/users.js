const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const userController = require("../controllers/userController");

router.get("/me", authenticateToken, userController.getLoggedInUserDetails);

module.exports = router;