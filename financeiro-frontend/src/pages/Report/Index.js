import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { list } from "../../cruds/finantial_transaction";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { search } from "../../cruds/report";
import "dayjs/locale/br";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

export default function Report() {
	const [data, setData] = useState([]);
	const client = useSelector((state) => state.client.client);
	const [initialDate, setInitialDate] = useState(dayjs());
	const [finalDate, setFinalDate] = useState(dayjs());
	const [type, setType] = useState("");
	const [dateType, setDateType] = useState("");
	const [isSubmitting, setSubmitting] = useState(false);

	dayjs.locale("br");
	dayjs.extend(utc);
	dayjs.extend(timezone);

	useEffect(() => {
		console.log(dayjs())
		// dayjs.tz.setDefault("America/Sao_Paulo");
	}, []);

	const products = [
		{
			id: "1000",
			code: "f230fh0g3",
			name: "Bamboo Watch",
			description: "Product Description",
			image: "bamboo-watch.jpg",
			price: 65,
			category: "Accessories",
			quantity: 24,
			inventoryStatus: "INSTOCK",
			rating: 5,
		},
	];

	const onSubmit = () => {
		setSubmitting(true);
		console.log(initialDate.format())
		search({
			inital_date: initialDate.format(),
			final_date: finalDate.format(),
			type: type,
			date_type: dateType,
			client: client,
		})
			.catch((err) => {
				Swal.fire("Ops", "Houve um erro ao salvar a conta", "error");
			})
			.then((res) => {
				setData(res.data);
			})
			.finally(() => setSubmitting(false));
	};

	return (
		<div className="my_container">
			<div className="main">
				<div className="container">
					<div className="header">
						<h1 className="list_title">Relatório</h1>
					</div>
					<div className="body">
						<Card>
							<Card.Body>
								<div className="form-row">
									<div className="form-group col-md-3">
										<DatePicker
											className="full-width"
											timezone="America/Sao_Paulo"
											onChange={setInitialDate}
											value={initialDate}
										/>
									</div>
									<div className="form-group col-md-3">
										<DatePicker
											className="full-width"
											timezone="America/Sao_Paulo"
											onChange={setFinalDate}
											value={finalDate}
										/>
									</div>
									<div className="form-group col-md-3">
										<FormControl fullWidth>
											<InputLabel id="select-state">
												Tipo
											</InputLabel>
											<Select
												labelId="select-state"
												id="select-state"
												value={type}
												label="Tipo "
												onChange={(e) =>
													setType(e.target.value)
												}
											>
												<MenuItem value={"RECEITA"}>
													Receita
												</MenuItem>
												<MenuItem value={"DESPESA"}>
													Despesa
												</MenuItem>
											</Select>
										</FormControl>
									</div>
									<div className="form-group col-md-2">
										<FormControl fullWidth>
											<InputLabel id="select-state">
												Por
											</InputLabel>
											<Select
												labelId="select-state"
												id="select-state"
												value={dateType}
												label="Por "
												onChange={(e) =>
													setDateType(e.target.value)
												}
											>
												<MenuItem value={"DUE_DATE"}>
													Dia de vencimento
												</MenuItem>
												<MenuItem value={"PAYDAY"}>
													Dia de pagamento
												</MenuItem>
											</Select>
										</FormControl>
									</div>
									<div className="form-group col-md-1 button-side-text">
										<Button
											startIcon={
												<FontAwesomeIcon
													icon={faSearch}
												/>
											}
											variant="contained"
											color="success"
											disabled={isSubmitting}
											onClick={onSubmit}
										>
											Buscar
										</Button>
									</div>
								</div>
							</Card.Body>
						</Card>

						<div className="card">
							<DataTable
								value={products}
								tableStyle={{ minWidth: "50rem" }}
							>
								<Column field="code" header="Code"></Column>
								<Column field="name" header="Name"></Column>
								<Column
									field="category"
									header="Category"
								></Column>
								<Column
									field="quantity"
									header="Quantity"
								></Column>
							</DataTable>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
