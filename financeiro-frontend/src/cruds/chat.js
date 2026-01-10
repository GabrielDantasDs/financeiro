import { io } from "socket.io-client";

export const sendMessage = async (message) => {
	const socket = io("http://localhost:8001", {
		transports: ["websocket"],
	});

	return new Promise((resolve, reject) => {
		// Evento de conexão
		socket.on("connect", () => {
			console.log("Conectado ao servidor Socket.IO");

			socket.emit("events", { text: message.message, clientId: message.clientId });
		});

		// Escutando respostas do servidor
		socket.on("events", (data) => {
			resolve(data);
		});
	});
};
