const User = require("../models/User");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Email already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});
		await newUser.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Registration failed" });
	}
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

		const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: "30d",
		});

        res.json({ accessToken: accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
};

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

const addFavorite = async (req, res) => {
    try {
        const userId = req.user;
        const { jobId } = req.body;
		console.log(jobId)
		console.log(userId)

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add jobId to user's favoriteJobs array
        user.favoriteJobs.push(jobId);

        // Save the updated user
        await user.save();

        // Send a success response
        res.status(200).json({ message: "Job added to favorites" });
    } catch (error) {
        // Send an error response
        res.status(500).json({ message: error.message });
    }
};

const removeFavorite = async (req, res) => {
    try {
        const userId = req.user;
        const { jobId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove jobId from user's favoriteJobs array
        const index = user.favoriteJobs.indexOf(jobId);
        if (index > -1) {
            user.favoriteJobs.splice(index, 1);
        }

        // Save the updated user
        await user.save();

        // Send a success response
        res.status(200).json({ message: "Job removed from favorites" });
    } catch (error) {
        // Send an error response
        res.status(500).json({ message: error.message });
    }
};

// verifica se um emprego esta nos favoritos
const isFavorite = async (req, res) => {
    try {
        const userId = req.user;
        const { jobId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if jobId is in user's favoriteJobs array
        const isFavorite = user.favoriteJobs.includes(jobId);

        // Send a response
        res.status(200).json({ isFavorite });
    } catch (error) {
        // Send an error response
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
	register,
	login,
	getLoggedInUserDetails,
	addFavorite,
	removeFavorite,
	isFavorite,
};