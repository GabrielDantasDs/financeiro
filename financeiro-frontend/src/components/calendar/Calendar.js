import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ptBr from "@fullcalendar/core/locales/pt-br";
import "../../style/calendar.css";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { formatCurrency } from "../../Utils";

export default function Calendar({ events }) {
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEventClick = (clickInfo) => {
		console.log(events);
		console.log(clickInfo.event);
		setSelectedEvent(clickInfo.event);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedEvent(null);
	};

	return (
		<div className="my_container">
			<div className="main">
				<div className="calendar-container">
					<FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" locale={ptBr} events={events} eventClick={handleEventClick} />
				</div>
			</div>

			<Dialog open={isModalOpen} onClose={handleCloseModal}>
				{selectedEvent && (
					<>
						<DialogTitle>Detalhes da Transação</DialogTitle>
						<DialogContent>
							<div className="transaction-details">
								<p>
									<strong>Descrição:</strong>
									<span>{selectedEvent.extendedProps.note}</span>
								</p>
								<p>
									<strong>Data de vencimento:</strong>
									<span>{new Date(selectedEvent.extendedProps.due_date).toLocaleDateString("pt-BR")}</span>
								</p>
								<p>
									<strong>Data de referência:</strong>
									<span>{new Date(selectedEvent.extendedProps.invoice_date).toLocaleDateString("pt-BR")}</span>
								</p>
								<p>
									<strong>Valor:</strong>
									<span>{formatCurrency(selectedEvent.extendedProps.value)}</span>
								</p>
								<p>
									<strong>Tipo:</strong>
									<span className={`transaction-type-${selectedEvent.extendedProps.type.toLowerCase()}`}>{selectedEvent.extendedProps.type === "RECEITA" ? "Receita" : "Despesa"}</span>
								</p>
							</div>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseModal} color="primary">
								Fechar
							</Button>
						</DialogActions>
					</>
				)}
			</Dialog>
		</div>
	);
}
