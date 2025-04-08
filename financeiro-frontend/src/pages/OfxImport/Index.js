import React, { useState } from "react";
import { Button } from "@mui/material";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFileImport } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { formatCurrency } from "../../Utils";
import "../../style/ofx-import.css";
import OFXParser from "../../utils/OfxExtractor";
import { create as createTransaction } from "../../cruds/finantial_transaction";
import { useSelector } from "react-redux";

export default function OfxImport() {
	const [transactions, setTransactions] = useState([]);
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [creatingTransactions, setCreatingTransactions] = useState(false);
	const client = useSelector((state) => state.client);

	const handleFileUpload = async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		setLoading(true);

		try {
			const reader = new FileReader();

			const readFileContent = new Promise((resolve, reject) => {
				reader.onload = (e) => resolve(e.target.result);
				reader.onerror = (e) => reject(e);
				reader.readAsText(file, "ISO-8859-1"); // Use ISO-8859-1 for Brazilian bank files
			});

			const content = await readFileContent;
			const ofx = new OFXParser();
			const ofxData = ofx.parse(content);

			// Get transactions array
			const transactions = ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;

			const processedTransactions = transactions.map((transaction) => {
				// Parse OFX date format (YYYYMMDD)
				const dateStr = transaction.DTPOSTED?.replace(/\[.*\]/, "").substring(0, 8);
				const year = dateStr.substring(0, 4);
				const month = dateStr.substring(4, 6);
				const day = dateStr.substring(6, 8);

				return {
					due_date: new Date(Date.UTC(year, month - 1, day, 0, 0, 0)),
					invoice_date: new Date(Date.UTC(year, month - 1, day, 0, 0, 0)),
					amount: parseFloat(transaction.TRNAMT || 0),
					description: (transaction.MEMO || "").trim(),
					type: parseFloat(transaction.TRNAMT || 0) > 0 ? "RECEITA" : "DESPESA",
				};
			});

			console.log("Processed Transactions:", processedTransactions);
			setTransactions(processedTransactions);
			Swal.fire("Sucesso", "Arquivo importado com sucesso", "success");
		} catch (error) {
			console.error("Error parsing OFX:", error);
			Swal.fire("Erro", "Falha ao importar arquivo OFX: " + error.message, "error");
		} finally {
			setLoading(false);
		}
	};

	const handleCreateTransactions = async () => {
		setCreatingTransactions(true);
		
		try {
			// Create all transactions in parallel
			await Promise.all(
				transactions.map(async (transaction) => {
					console.log(transaction)
					const transactionData = {
						value: transaction.amount < 0 ? transaction.amount * -1 : transaction.amount,
						note: transaction.description,
						type: transaction.type,
						due_date: transaction.due_date.toISOString(),
						invoice_date: transaction.invoice_date.toISOString(),
						payed: true,
						client_id: parseInt(client),
					};

					return createTransaction(transactionData);
				})
			);

			Swal.fire('Sucesso', 'Transações criadas com sucesso', 'success');
			setTransactions([]); // Clear transactions after creation
		} catch (error) {
			console.error('Error creating transactions:', error);
			Swal.fire('Erro', 'Falha ao criar transações: ' + error.message, 'error');
		} finally {
			setCreatingTransactions(false);
		}
	};

	const renderHeader = () => {
		return (
			<div className="table-header">
				<div className="search-wrapper">
					<span className="p-input-icon-left">
						<i className="pi pi-search" />
						<InputText 
							value={globalFilterValue} 
							onChange={onGlobalFilterChange} 
							placeholder="Buscar transação"
							className="search-input" 
						/>
					</span>
				</div>
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

	const amountTemplate = (rowData) => {
		return formatCurrency(rowData.amount);
	};

	const dateTemplate = (rowData) => {
		const options = {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			timeZone: "UTC",
		};

		return rowData.invoice_date.toLocaleDateString("pt-BR", options);
	};

	const header = renderHeader();

	return (
		<div className="main">
			<div className="container">
				<div className="header">
					<h1 className="screen-title">Importação OFX</h1>
				</div>

				<div className="body">
					<div className="upload-section">
						<input type="file" accept=".ofx" onChange={handleFileUpload} style={{ display: "none" }} id="ofx-upload" />
						<label htmlFor="ofx-upload">
							<Button variant="contained" component="span" startIcon={<FontAwesomeIcon icon={faUpload} />} disabled={loading}>
								Selecionar arquivo OFX
							</Button>
						</label>
						{transactions.length > 0 && (
							<Button
								variant="contained"
								color="primary"
								onClick={handleCreateTransactions}
								disabled={creatingTransactions}
								startIcon={<FontAwesomeIcon icon={faFileImport} />}
								style={{ marginLeft: '1rem' }}
							>
								Criar Transações
							</Button>
						)}
					</div>

					{transactions.length > 0 && (
						<div className="table-section">
							<DataTable value={transactions} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} filters={filters} globalFilterFields={["description", "amount"]} header={header} emptyMessage="Nenhuma transação encontrada" loading={loading}>
								<Column field="date" header="Data" body={dateTemplate} sortable />
								<Column field="description" header="Descrição" sortable />
								<Column field="amount" header="Valor" body={amountTemplate} sortable />
								<Column field="type" header="Tipo" sortable />
							</DataTable>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
