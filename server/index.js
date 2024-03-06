const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const usersRouter = require("./routes/users");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error);

app.use("/users", usersRouter);

app.listen(3000, () => {
	console.log("Server is running on  http://localhost:3000/");
});