const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/me", authenticateToken, userController.getLoggedInUserDetails);
router.post("/job/new", authenticateToken, userController.addFavorite);
router.post("/job/remove", authenticateToken, userController.removeFavorite); 
router.post("/job/isfavorite", authenticateToken, userController.isFavorite); // verifica se um emprego esta nos favoritos

module.exports = router;