import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import ptBr from '@fullcalendar/core/locales/pt-br';

export default function Calendar(events) {
	return (
		<div className="my_container">
			<div className="main">
				<div className="container">
					<FullCalendar
						plugins={[dayGridPlugin]}
						initialView="dayGridMonth"
                        locale={ptBr}
						events={events}
					/>
				</div>
			</div>
		</div>
	);
}
