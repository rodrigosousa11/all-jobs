const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/me", authenticateToken, userController.getLoggedInUserDetails);

module.exports = router;