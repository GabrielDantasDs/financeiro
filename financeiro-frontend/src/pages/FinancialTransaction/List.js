import "../../style/cliente.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useEffect, useState } from "react";
import { list, remove, markedPaid as markedPaidReq } from "../../cruds/finantial_transaction";
import Swal from "sweetalert2";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Link } from "react-router-dom";
import { maskCurrency } from "./Utils";
import { useSelector } from "react-redux";

export default function List() {
	const [financialTransactions, setFinancialTransactions] = useState([]);
	const client = useSelector((state) => state.client);
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const [globalFilterValue, setGlobalFilterValue] = useState("");

	useEffect(() => {
		fetch();
	}, [globalFilterValue]);

	const fetch = () => {
		list(client, globalFilterValue)
			.then((res) => {
				console.log(res.data);
				setFinancialTransactions([...res.data]);
			})
			.catch((err) => {
				Swal.fire("Ops", "Houve um erro ao buscar a lista de lançamentos.", "error");
			});
	};

	const renderHeader = () => {
		return (
			<div className="flex justify-content-end">
				<span className="p-input-icon-left">
					<i className="pi pi-search" />
					<InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Busque pelo nome" />
				</span>
			</div>
		);
	};

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };

		_filters["global"].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const deleteRecord = (id) => {
		remove(id)
			.catch((error) => {
				Swal.fire("Ops", "Houve um erro ao remover esse registro.", "error");
				return;
			})
			.then((res) => {
				if (res.status == 200) {
					list()
						.catch((err) => {
							Swal.fire("Ops", "Houve um erro ao buscar a lista de lançamentos.", "error");
						})
						.then((res) => {
							setFinancialTransactions(res.data);
						});
				}
			});
	};

	const markedPaid = (id) => {
		markedPaidReq(id)
			.then((res) => {
				if (res.status == 200) {
					Swal.fire("Ops", "Marcado como pago com sucesso!", "success");
					const auxFinancialTransactions = [...financialTransactions];

					auxFinancialTransactions.find((x) => x.id == id).payed = 1;

					setFinancialTransactions(auxFinancialTransactions);
				}

				return;
			})
			.catch((err) => {
				Swal.fire("Ops", "Houve um erro ao marcar como pago.", "error");
				return;
			});
	};

	const actionBody = (rowData) => {
		return (
			<div style={{ maxWidth: 150 }} className="d-flex justify-content-between">
				<Link to={`/financial-transaction/edit/${rowData.id}`} type="button" className="btn btn-primary">
					<FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
				</Link>
				<button
					type="button"
					className="btn btn-danger"
					onClick={(e) => {
						e.preventDefault();
						deleteRecord(rowData.id);
					}}>
					<FontAwesomeIcon icon="fa-solid fa-trash" />
				</button>
				{!rowData?.payed && (
					<button
						className="btn btn-success"
						onClick={(e) => {
							e.preventDefault();
							markedPaid(rowData.id);
						}}>
						{" "}
						<FontAwesomeIcon icon="fa-solid fa-arrow-down" />
					</button>
				)}
			</div>
		);
	};

	const header = renderHeader();

	return (
		<div className="main">
			<div className="container">
				<div className="header">
					<h1 className="screen-title">Lançamentos</h1>
				</div>
				<div className="body">
					<div className="database-header">
						<Link to="/financial-transaction/new" variant="contained" type="button">
							<Button startIcon={<FontAwesomeIcon icon={faPlus} />} variant="contained" color="success">
								Novo lançamento
							</Button>
						</Link>
					</div>
					<div style={{ width: "100%" }}>
						<DataTable value={financialTransactions} stripedRows showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }} filters={filters} globalFilterFields={["note"]} header={header} emptyMessage="Não há registros.">
							<Column field="note" header="Nome"></Column>
							<Column
								field="value"
								header="Valor"
								body={(rowData) => {
									return maskCurrency(rowData.value);
								}}></Column>
							<Column header="Data de vencimento" field="due_date" body={
								(rowData) => {
									return new Date(rowData.due_date).toLocaleDateString();
								}
							}></Column>
							<Column header="Opções" body={actionBody}></Column>
						</DataTable>
					</div>
				</div>
			</div>
		</div>
	);
}
