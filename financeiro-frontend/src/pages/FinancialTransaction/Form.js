import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { mascaraMoeda, validate } from "./Utils";
import "dayjs/locale/pt-br";
import { DatePicker } from "@mui/x-date-pickers";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCommonData } from "../Client/Service";
import dayjs from "dayjs";

export default function IForm({ data, onSubmit }) {
	const [loading, setLoading] = useState(true);
	const [initialValues, setInitialValues] = useState({
		type: "",
		value: "",
		category_id: "",
		note: "",
		subscriber_id: "",
		cost_center_id: "",
		bank_account_id: "",
		payed: false,
		payment_day: dayjs(),
		periodicity: null,
		periodicity: "",
		number_installments: 1,
	});
	const [isSubmitting, setSubmitting] = useState(false);
	const [bankAccounts, setBankAccounts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [costCenters, setCostCenters] = useState([]);
	const [subscribers, setSubscribers] = useState([]);

	const client = useSelector((state) => state.client);

	const onChangeCategory = (e) => {
		let category_id = e.target.value;

		const iCostCenters = costCenters.filter((item) => item.category_id == category_id);

		setCostCenters(iCostCenters);
	};

	useEffect(() => {
		setLoading(true);

		fetchData();

		setLoading(false);
	}, []);

	useEffect(() => {
		if (data != null) {
			setLoading(true);

			setInitialValues(data);

			setLoading(false);
		}
	}, [data]);

	const fetchData = async () => {
		const [categories, costCenters, bankAccountList] = await fetchCommonData(client);

		setCategories(categories);
		setCostCenters(costCenters);
		setBankAccounts(bankAccountList);
	};

	const handleSubmit = (values) => {
		setSubmitting(true);
		onSubmit(values);
		setSubmitting(false);
	};

	return (
		<div className="main">
			{!loading ? (
				<div className="container">
					<div className="header">
						<h1 className="screen-title">Lançamento: Novo lançamento</h1>
					</div>
					<div className="form">
						<Formik enableReinitialize={true} initialValues={initialValues} validate={(values) => validate(values)} onSubmit={handleSubmit}>
							{({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
								<Form>
									<div className="form-row">
										<div className="form-group col-md-6">
											<TextField required id="outlined-required" label="Nome *" value={values.note} error={touched.note && errors.note ? true : false} name="note" onBlur={handleBlur} fullWidth onChange={handleChange} />
										</div>

										<div className="form-group col-md-6">
											<FormControl fullWidth>
												<InputLabel id="select-state">Tipo</InputLabel>
												<Select labelId="select-state" id="select-state" value={values.type} name="type" label="Tipo *" onChange={handleChange}>
													<MenuItem value={"RECEITA"}>Receita</MenuItem>
													<MenuItem value={"DESPESA"}>Despesa</MenuItem>
												</Select>
											</FormControl>
										</div>
									</div>

									<div className="form-row">
										<div className="form-group col-md-6">
											<FormControl fullWidth>
												<InputLabel id="select-state">Conta</InputLabel>
												<Select labelId="select-state" id="select-state" value={values.bank_account_id} name="bank_account_id" label="Conta *" onChange={handleChange}>
													{bankAccounts.map((obj, i) => {
														return (
															<MenuItem key={i} value={obj.id}>
																{obj.name}
															</MenuItem>
														);
													})}
												</Select>
											</FormControl>
										</div>
										<div className="form-group col-md-6">
											<FormControl fullWidth>
												<InputLabel id="select-state">Cliente/Fornecedor</InputLabel>
												<Select labelId="select-state" id="select-state" value={values.subscriber_id} name="subscriber_id" label="Cliente/Fornecedor " onChange={handleChange}>
													{subscribers.map((obj, i) => {
														return (
															<MenuItem key={i} value={obj.id}>
																{obj.name}
															</MenuItem>
														);
													})}
												</Select>
											</FormControl>
										</div>
									</div>

									<div className="form-row">
										<div className="form-group col-md-4">
											<TextField id="outlined" label="Valor *" fullWidth value={values.value} error={touched.value && errors.value ? true : false} name="value" onBlur={handleBlur} onChange={(e) => handleChange(mascaraMoeda(e))} inputProps={{ maxLength: 70 }} />
										</div>
										<div className="form-group col-md-4">
											<FormControl fullWidth>
												<InputLabel id="select-state">Categoria</InputLabel>
												<Select
													labelId="select-state"
													id="select-state"
													value={values.category_id}
													name="category_id"
													label="Categoria *"
													onChange={(e) => {
														handleChange(e);
														onChangeCategory(e);
													}}
												>
													{categories.map((obj, i) => {
														return (
															<MenuItem key={i} value={obj.id}>
																{obj.name}
															</MenuItem>
														);
													})}
												</Select>
											</FormControl>
										</div>
										<div className="form-group col-md-4">
											<FormControl fullWidth>
												<InputLabel id="select-state">Centro de custo</InputLabel>
												<Select labelId="select-state" id="select-state" value={values.cost_center_id} name="cost_center_id" label="Centro de custo " onChange={handleChange}>
													{costCenters.map((obj, i) => {
														return (
															<MenuItem key={i} value={obj.id}>
																{obj.name}
															</MenuItem>
														);
													})}
												</Select>
											</FormControl>
										</div>
									</div>

									<div className="form-row">
										<div className="form-group col-md-4">
											<DatePicker label={"Data de vencimento *"} className="full-width" name="payment_day" onChange={(newValue) => setFieldValue("payment_day", newValue)} value={values.payment_day} error={touched.payment_day && errors.payment_day ? true : false} onBlur={handleBlur} />
										</div>
										<div className="form-group col-md-4">
											<FormControl fullWidth>
												<InputLabel id="select-state">Recorrência</InputLabel>
												<Select labelId="select-state" id="select-state" value={values.periodicity_type} name="periodicity_type" label="Recorrência" onChange={handleChange}>
													<MenuItem value={"UNICA"}>Única</MenuItem>
													<MenuItem value={"RECORRENTE"}>Recorrente</MenuItem>
												</Select>
											</FormControl>
										</div>

										<div className="form-group col-md-4">
											<FormControl fullWidth>
												<InputLabel id="select-state">Pago</InputLabel>
												<Select labelId="select-state" id="select-state" value={values.payed} name="payed" label="Pago" onChange={handleChange}>
													<MenuItem value={true}>Sim</MenuItem>
													<MenuItem value={false}>Não</MenuItem>
												</Select>
											</FormControl>
										</div>
									</div>

									{values.periodicity === "RECORRENTE" && (
										<div className="form-row">
											<div className="form-group col-md-4">
												<FormControl fullWidth>
													<InputLabel id="select-state">Periocidade</InputLabel>
													<Select labelId="select-state" id="select-state" value={values.periodicity} name="periodicity" label="Periodicidade" onChange={handleChange}>
														<MenuItem value={7}>Semanal</MenuItem>
														<MenuItem value={15}>Quinzenal</MenuItem>
														<MenuItem value={30}>Mensal</MenuItem>
														<MenuItem value={60}>Bimestral</MenuItem>
														<MenuItem value={180}>Semestral</MenuItem>
														<MenuItem value={365}>Anual</MenuItem>
													</Select>
												</FormControl>
											</div>

											<div className="form-group col-md-4">
												<TextField id="outlined" label="Quantidade de parcelas" type="number" fullWidth value={values.number_installments} error={touched.number_installments && errors.number_installments ? true : false} name="number_installments" onBlur={handleBlur} onChange={handleChange} />
											</div>
										</div>
									)}

									<div className="d-flex flex-row-reverse">
										<Button startIcon={<FontAwesomeIcon icon={faCheck} />} variant="contained" color="success" disabled={isSubmitting} type="submit">
											Salvar
										</Button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			) : null}
		</div>
	);
}
