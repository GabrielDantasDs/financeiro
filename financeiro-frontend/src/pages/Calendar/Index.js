import { useEffect, useState } from "react";
import Calendar from "../../components/calendar/Calendar";
import { getCalendar } from "../../cruds/finantial_transaction";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { formatBRL } from "../../Utils";

export default function Index() {
	const [data, setData] = useState([]);
	const client = useSelector((state) => state.client);

	useEffect(() => {
		fetch();
	}, []);

	const fetch = () => {
		getCalendar(client)
			.then((res) => {
				const events = res.data.map(event => {
					return {
						'title': event.note + " " + formatBRL(event.value),
						'date': dayjs(event.due_date).format('YYYY-MM-DD'),
						'value': event.value,
						'due_date': event.due_date,
						'invoice_date': event.invoice_date,
						'payed': event.payed,
						'note': event.note,
						'type': event.type
					}
				});

				setData(events);
			})
			.catch((error) => {
				Swal.fire("Ops", "Houve um erro ao buscar os dados.", "error");
				return;
			});
	};

	return <Calendar events={data}/>;
}
