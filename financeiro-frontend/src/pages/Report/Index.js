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
	Checkbox,
	FormGroup,
	FormControlLabel,
} from "@mui/material";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { search } from "../../cruds/report";
import "dayjs/locale/br";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { maskCurrency } from "../FinancialTransaction/Utils";
import "../../style/report.css";
import { simpleList as simpleListCategories } from "../../cruds/category";
import { list as simpleListBankAccounts } from "../../cruds/bank-account";

export default function Report() {
	const [data, setData] = useState([]);
	const [categories, setCategories] = useState([]);
	const [bankAccounts, setBankAccounts] = useState([]);
	const client = useSelector((state) => state.client.client);
	const [initialDate, setInitialDate] = useState(dayjs());
	const [finalDate, setFinalDate] = useState(dayjs());
	const [type, setType] = useState("SALDO");
	const [category, setCategory] = useState("");
	const [bankAccount, setBankAccount] = useState("");
	const [dateType, setDateType] = useState("DUE_DATE");
	const [isSubmitting, setSubmitting] = useState(false);
	const [includeInitialBalance, setIncludeInitialBalance] = useState(false);

	dayjs.locale("br");
	dayjs.extend(utc);
	dayjs.extend(timezone);

	useEffect(() => {
		const fetch = async () => {
			const [icategories, ibankAccounts] = await Promise.all([
				simpleListCategories()
					.then((res) => {
						return res.data;
					})
					.catch((err) => {
						Swal.fire(
							"Ops",
							"Houve um erro ao buscar as categorias",
							"error"
						);
					}),
				simpleListBankAccounts(client)
					.then((res) => {
						return res.data;
					})
					.catch((err) => {
						Swal.fire(
							"Ops",
							"Houve um erro ao buscar as contas",
							"error"
						);
					}),
			]);

			setCategories(icategories);
			setBankAccounts(ibankAccounts);
		};

		fetch();
	}, []);

	const onSubmit = () => {
		setSubmitting(true);

		search({
			inital_date: initialDate.format(),
			final_date: finalDate.format(),
			type: type,
			date_type: dateType,
			client: client,
			category: category,
			bank_account: bankAccount,
		})
			.catch((err) => {
				Swal.fire("Ops", "Houve um erro ao salvar a conta", "error");
			})
			.then((res) => {
				setData(res.data);
			})
			.finally(() => setSubmitting(false));
	};

	const footer = () => {
		if (data.length > 0) {
			let balance = data.reduce(
				(accumulator, currentValue) =>
					accumulator +
					(currentValue.fin_type === "DESPESA"
						? -parseFloat(currentValue.fin_value)
						: parseFloat(currentValue.fin_value)),
				0
			);

			let initialBalance = 0;
			let total = 0;

			if (includeInitialBalance) {
				if (bankAccount != "") {
					initialBalance = parseFloat(bankAccount.bac_inicial_value);
					total = balance + initialBalance;
				} else {
					initialBalance = bankAccounts.reduce(
						(accumulator, currentValue) =>
							accumulator +
							parseFloat(currentValue.bac_inicial_value),
						0
					);
					total = balance + initialBalance;
				}
			} else {
				total = balance;
			}

			return (
				<Card className="d-flex">
					Total:{" "}
					<span
						className={
							total > 0
								? "positive-value total-span"
								: "negative-value total-span"
						}
					>
						{includeInitialBalance
							? `${maskCurrency(initialBalance)} + ${maskCurrency(balance)} = ${maskCurrency(total)}`
							: maskCurrency(total)
						}
					</span>
				</Card>
			);
		}

		return null;
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
									<div className="form-group col-md-6">
										<DatePicker
											className="full-width"
											timezone="America/Sao_Paulo"
											onChange={setInitialDate}
											value={initialDate}
										/>
									</div>
									<div className="form-group col-md-6">
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
												<MenuItem value={"SALDO"}>
													Saldo
												</MenuItem>
												<MenuItem value={"RECEITA"}>
													Receita
												</MenuItem>
												<MenuItem value={"DESPESA"}>
													Despesa
												</MenuItem>
											</Select>
										</FormControl>
									</div>
									<div className="form-group col-md-3">
										<FormControl fullWidth>
											<InputLabel id="select-state">
												Categoria
											</InputLabel>
											<Select
												labelId="select-state"
												id="select-state"
												value={category}
												label="Categoria "
												onChange={(e) =>
													setCategory(e.target.value)
												}
											>
												<MenuItem value="">Todas</MenuItem>
												{categories.map((item, i) => {
													return (
														<MenuItem
															key={i}
															value={item.id}
														>
															{item.cat_name}
														</MenuItem>
													);
												})}
											</Select>
										</FormControl>
									</div>

									<div className="form-group col-md-3">
										<FormControl fullWidth>
											<InputLabel id="select-state">
												Conta bancária
											</InputLabel>
											<Select
												labelId="select-state"
												id="select-state"
												value={bankAccount}
												label="Conta bancária "
												onChange={(e) =>
													setBankAccount(
														e.target.value
													)
												}
											>
												<MenuItem value="">
													Todas
												</MenuItem>
												{bankAccounts.map((item, i) => {
													return (
														<MenuItem
															key={i}
															value={item.id}
														>
															{item.bac_name}
														</MenuItem>
													);
												})}
											</Select>
										</FormControl>
									</div>

									<div className="form-group col-md-3">
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
												<MenuItem value={""}></MenuItem>
												<MenuItem value={"DUE_DATE"}>
													Dia de vencimento
												</MenuItem>
												<MenuItem value={"PAYDAY"}>
													Dia de pagamento
												</MenuItem>
											</Select>
										</FormControl>
									</div>

									<div className="form-group col-md-2">
										<FormGroup>
											<FormControlLabel
												control={
													<Checkbox
														value={
															includeInitialBalance
														}
														onChange={(e) => {
															setIncludeInitialBalance(
																e.target.checked
															);
														}}
													/>
												}
												label="Incluir saldo inicial"
											/>
										</FormGroup>
									</div>

									<div className="form-group col-md offset-md-8">
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
											className="inline-end"
										>
											Buscar
										</Button>
									</div>
								</div>
							</Card.Body>
						</Card>

						<div className="card">
							<DataTable
								value={data}
								tableStyle={{ minWidth: "50rem" }}
								scrollable
								scrollHeight="400px"
								footer={footer}
								emptyMessage="Não foram encontrados resultados."
							>
								<Column field="fin_note" header="Nome"></Column>
								<Column
									field="fin_category"
									header="Categoria"
									body={(rowData) => {
										return rowData.fin_category.cat_name;
									}}
								></Column>
								<Column
									field="fin_value"
									header="Valor"
									body={(rowData) => {
										return (
											<span
												className={
													rowData.fin_type ==
													"RECEITA"
														? "positive-value"
														: "negative-value"
												}
											>
												{maskCurrency(
													rowData.fin_value
												)}
											</span>
										);
									}}
								></Column>
							</DataTable>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
