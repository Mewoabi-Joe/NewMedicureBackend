//imports
const express = require("express");
const mongoose = require("mongoose");

const temperatureRoutes = require("./routes/temperature");
const userRoutes = require("./routes/user");

//app creation
const app = express();

mongoose
	.connect("mongodb+srv://admin:admin@cluster0.byv6v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});
app.use("/api/temperature", temperatureRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
//mongodb+srv://admin:<password>@cluster0.kc41f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
