const User = require("../models/User");
require("dotenv").config();

const getLoggedInUserDetails = async (req, res) => {
	try {
		const userId = req.user;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({ firstName: user.firstName, lastName: user.lastName });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to fetch user details" });
	}
};

module.exports = {
	getLoggedInUserDetails,
};