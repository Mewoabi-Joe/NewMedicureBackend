const http = require("http");
const app = require("./app");

//Initialisation code mttq
const mqtt = require("mqtt");
var isOn = true;
const host = "broker.emqx.io";
const mqttPort = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
let a = true;
const connectUrl = `mqtt://${host}:${mqttPort}`;

//Initializing socket
var socket = require("socket.io");

const normalizePort = (val) => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
	if (error.syscall !== "listen") {
		throw error;
	}
	const address = server.address();
	const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges.");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use.");
			process.exit(1);
			break;
		default:
			throw error;
	}
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
	const address = server.address();
	const bind = typeof address === "string" ? "pipe " + address : "port " + port;
	console.log("Listening on " + bind);
});

server.listen(port);

const client = mqtt.connect(connectUrl, {
	clientId,
	clean: true,
	connectTimeout: 4000,
	username: "emqx",
	password: "public",
	reconnectPeriod: 1000,
});

//Code mttq
const topic = "medicure";
client.on("connect", () => {
	console.log("Connected");
	client.subscribe([topic], () => {
		console.log(`Subscribe to topic '${topic}'`);
	});

	setInterval(() => {
		isOn = !isOn;
		let message;
		if (isOn) {
			message = "true";
		} else {
			message = "false";
		}
		client.publish(topic, message, { qos: 0, retain: false }, (error) => {
			if (error) {
				console.error(error);
			}
		});
	}, 2000);
});
client.on("message", (topic, payload) => {
	// console.log("Received Message:", topic, payload.toString());
	// console.log("Received Message:", topic, payload.toString());
});

//Code socket
var io = socket(server);

io.on("connection", (socket) => {
	console.log("made socket connection", socket.id);

	//Construct json and send through socket
	setInterval(() => {
		//Envoyer random parameters apres 2 secondes
		socket.emit("parameters", {
			temperature: Math.random() * 7 + 36,
			heartRate: Math.random() * 300 + 500,
		});
	}, 2000);

	//Affiche le message de retoure que le client envoie dans le console
	socket.on("return", (data) => {
		console.log(data);
	});
});
