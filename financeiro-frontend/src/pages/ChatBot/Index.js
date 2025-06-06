import React, { useState } from "react";
import "../../style/chat-bot.css"; // Estilos simples
import axios from "axios";
import { sendMessage } from "../../cruds/chat";
import { useSelector } from "react-redux";

export default function ChatBot() {
	const [messages, setMessages] = useState([{ sender: "bot", text: "Como posso ajudar ?" }]);
	const [input, setInput] = useState("");
	const client = useSelector((state) => state.client);
	const [data, setData] = useState();

	const handleSend = async () => {
		if (!input.trim()) return;

		const userMessage = { sender: "user", text: input };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");

		try {
			await sendMessage({ message: input, clientId: client })
				.then((res) => {
					const botMessage = { sender: "bot", text: res || "Erro na resposta" };
					setMessages((prev) => [...prev, botMessage]);
					setData(res);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			setMessages((prev) => [...prev, { sender: "bot", text: "Erro ao se comunicar com o servidor." }]);
		}
	};

	return (
		<div className="chat-container">
			<div className="chat-window">
				{messages.map((msg, idx) => (
					<div key={idx} className={`message ${msg.sender}`}>
						<span>{msg.text}</span>
					</div>
				))}
			</div>
			<div className="chat-input">
				<input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Digite uma mensagem..." onKeyDown={(e) => e.key === "Enter" && handleSend()} />
				<button onClick={handleSend}>Enviar</button>
			</div>
		</div>
	);
}
