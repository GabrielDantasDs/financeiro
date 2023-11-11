import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { update, get } from "../../cruds/finantial_transaction";
import { mascaraMoeda, validate, cleanCurrency } from "./Utils";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { simpleList as getCategories } from "../../cruds/category";
import { simpleList as getCostCenters } from "../../cruds/cost-center";
import { simpleList as getSubscribers } from "../../cruds/subscriber";

export default function Edit() {
	const [isSubmitting, setSubmitting] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const client = useSelector((state) => state.client.client);
	const [bankInstitutionList, setBankInstitutionList] = useState([]);
	const [categories, setCategories] = useState([]);
	const [costCenters, setCostCenters] = useState([]);
	const [subscribers, setSubscribers] = useState([]);
	const [data, setData] = useState(null);

	const params = useParams();

	useEffect(() => {
		setLoading(true);

		async function fetchData() {
			const [data, cost_centers_list, subscribersList] =
				await Promise.all([
					get(params.id)
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
					getCostCenters()
						.then((res) => {
							return res.data;
						})
						.catch((err) => {
							Swal.fire(
								"Ops",
								"Houve um erro ao buscar as categorias",
								"error"
							);
							return;
						}),
					getSubscribers()
						.then((res) => {
							return res.data;
						})
						.catch((err) => {
							Swal.fire(
								"Ops",
								"Houve um erro ao buscar as categorias",
								"error"
							);
							return;
						}),
				]);

			setData(data);
			setCategories(
				cost_centers_list.find(
					(item) => item.id == data.fin_id_center_cost
				).category
			);
			setCostCenters(cost_centers_list);
			setSubscribers(subscribersList);
		}

		fetchData();

		setLoading(false);
	}, []);

	const getIniitalState = () => {
		return {
			fin_type: data?.fin_type ?? "",
			fin_value: data.fin_value ?? "",
			fin_id_category: data.fin_id_category ?? "",
			fin_note: data?.fin_note ?? "",
			subscriberId: data.subscriberId ?? "",
			fin_id_center_cost: data.fin_id_center_cost ?? "",
			fin_id_bank_account: data.fin_id_bank_account ?? "",
			fin_payed: data.fin_payed ?? false,
			fin_payment_day: data.fin_payment_day
				? dayjs(data.fin_payment_day)
				: dayjs(),
			fin_periodicity: data.fin_periodicity ?? "",
			fin_periodicity_type: data.fin_periodicity_type ?? "",
			fin_number_installments: data.fin_number_installments ?? 1,
		};
	};

	const onChangeFinDate = (e, setFieldValue) => {
		setFieldValue("fin_payment_day", e.target.value);
	};

	const onChangeCostCenter = (cost_center) => {
		const icategories = costCenters.find(
			(item) => item.id == cost_center
		).category;

		setCategories(icategories);
	};

	const onSubmit = (values) => {
		const formatted_values = {
			...values,
			fin_value: cleanCurrency(values.fin_value),
			fin_id_client: 1,
			fin_periodicity:
				values.fin_periodicity != "" ? values.fin_periodicity : null,
		};

		update(params.id, formatted_values)
			.then((res) => {
				Swal.fire("Sucesso", "Lançamento salvo com sucesso", "success");
				navigate("/financial-transaction");
			})
			.catch((err) => {
				Swal.fire("Ops", "Houve um erro ao salvar a conta", "error");
			})
			.finally(() => setSubmitting(false));
	};

	return (
		<div className="main">
			{data != null ? (
				<div className="container">
					<div className="header">
						<h1 className="list_title">
							Lançamento: Novo lançamento
						</h1>
					</div>
					<div className="form">
						<Formik
							initialValues={getIniitalState()}
							validate={(values) => validate(values)}
							onSubmit={(values) => {
								onSubmit(values);
							}}
						>
							{({
								values,

								errors,

								touched,

								handleChange,

								handleBlur,

								handleSubmit,

								setFieldValue,

								isSubmitting,
							}) => (
								<Form>
									<div className="form-row">
										<div className="form-group col-md-6">
											<TextField
												required
												id="outlined-required"
												label="Nome"
												value={values.fin_note}
												error={
													touched.fin_note &&
													errors.fin_note
														? true
														: false
												}
												name="fin_note"
												onBlur={handleBlur}
												fullWidth
												onChange={handleChange}
											/>
										</div>

										<div className="form-group col-md-6">
											<FormControl fullWidth>
												<InputLabel id="select-state">
													Tipo
												</InputLabel>
												<Select
													labelId="select-state"
													id="select-state"
													value={values.fin_type}
													name="fin_type"
													label="Tipo "
													onChange={handleChange}
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
									</div>

									<div className="form-row">
										<div className="form-group col-md-6">
											<TextField
												id="outlined"
												label="Valor"
												fullWidth
												value={values.fin_value}
												error={
													touched.fin_value &&
													errors.fin_value
														? true
														: false
												}
												name="fin_value"
												onBlur={handleBlur}
												onChange={(e) =>
													handleChange(
														mascaraMoeda(e)
													)
												}
												inputProps={{ maxLength: 70 }}
											/>
										</div>

										<div className="form-group col-md-6">
										<FormControl fullWidth>
												<InputLabel id="select-state">
													Centro de custo
												</InputLabel>
												<Select
													labelId="select-state"
													id="select-state"
													value={
														values.fin_id_center_cost
													}
													name="fin_id_center_cost"
													label="Centro de custo "
													onChange={(e) => {
														handleChange(e);
														onChangeCostCenter(
															e.target.value
														);
													}}
												>
													{costCenters.map(
														(obj, i) => {
															return (
																<MenuItem
																	key={i}
																	value={
																		obj.id
																	}
																>
																	{
																		obj.coc_name
																	}
																</MenuItem>
															);
														}
													)}
												</Select>
											</FormControl>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
										<FormControl fullWidth>
												<InputLabel id="select-state">
													Categoria
												</InputLabel>
												<Select
													labelId="select-state"
													id="select-state"
													value={
														values.fin_id_category
													}
													name="fin_id_category"
													label="Categoria "
													onChange={handleChange}
												>
													{categories.map(
														(obj, i) => {
															return (
																<MenuItem
																	key={i}
																	value={
																		obj.id
																	}
																>
																	{
																		obj.cat_name
																	}
																</MenuItem>
															);
														}
													)}
												</Select>
											</FormControl>
										</div>

										<div className="form-group col-md-6">
											<FormControl fullWidth>
												<InputLabel id="select-state">
													Cliente/Fornecedor
												</InputLabel>
												<Select
													labelId="select-state"
													id="select-state"
													value={values.subscriberId}
													name="subscriberId"
													label="Cliente/Fornecedor "
													onChange={handleChange}
												>
													{subscribers.map(
														(obj, i) => {
															return (
																<MenuItem
																	key={i}
																	value={
																		obj.id
																	}
																>
																	{
																		obj.sub_name
																	}
																</MenuItem>
															);
														}
													)}
												</Select>
											</FormControl>
										</div>
									</div>

									<div className="form-row">
										<div className="form-group col-md-6">
											<DatePicker
												className="full-width"
												name="fin_payment_day"
												onChange={(newValue) =>
													setFieldValue(
														"fin_payment_day",
														newValue
													)
												}
												value={values.fin_payment_day}
												error={
													touched.fin_payment_day &&
													errors.fin_payment_day
														? true
														: false
												}
												onBlur={handleBlur}
											/>
										</div>
										<div className="form-group col-md-6">
											<FormControl fullWidth>
												<InputLabel id="select-state">
													Recorrencia
												</InputLabel>
												<Select
													labelId="select-state"
													id="select-state"
													value={
														values.fin_periodicity_type
													}
													name="fin_periodicity_type"
													label="Recorrência"
													onChange={handleChange}
												>
													<MenuItem value={"UNICA"}>
														Única
													</MenuItem>
													<MenuItem
														value={"RECORRENTE"}
													>
														Recorrente
													</MenuItem>
												</Select>
											</FormControl>
										</div>
									</div>

									{values.fin_periodicity_type ===
										"RECORRENTE" && (
										<div className="form-row">
											<div className="form-group col-md-6">
												<FormControl fullWidth>
													<InputLabel id="select-state">
														Periocidade
													</InputLabel>
													<Select
														labelId="select-state"
														id="select-state"
														value={
															values.fin_periodicity
														}
														name="fin_periodicity"
														label="Periodicidade"
														onChange={handleChange}
													>
														<MenuItem value={7}>
															Semanal
														</MenuItem>
														<MenuItem value={15}>
															Quinzenal
														</MenuItem>
														<MenuItem value={30}>
															Mensal
														</MenuItem>
														<MenuItem value={60}>
															Bimestral
														</MenuItem>
														<MenuItem value={180}>
															Semestral
														</MenuItem>
														<MenuItem value={365}>
															Anual
														</MenuItem>
													</Select>
												</FormControl>
											</div>

											<div className="form-group col-md-6">
												<TextField
													id="outlined"
													label="Quantidade de parcelas"
													type="number"
													fullWidth
													value={
														values.fin_number_installments
													}
													error={
														touched.fin_number_installments &&
														errors.fin_number_installments
															? true
															: false
													}
													name="fin_number_installments"
													onBlur={handleBlur}
													onChange={handleChange}
												/>
											</div>
										</div>
									)}

									<div className="form-row">
										<FormControl fullWidth>
											<InputLabel id="select-state">
												Pago
											</InputLabel>
											<Select
												labelId="select-state"
												id="select-state"
												value={values.fin_payed}
												name="fin_payed"
												label="Pago"
												onChange={handleChange}
											>
												<MenuItem value={true}>
													Sim
												</MenuItem>
												<MenuItem value={false}>
													Não
												</MenuItem>
											</Select>
										</FormControl>
									</div>

									<div className="d-flex flex-row-reverse">
										<Button
											startIcon={
												<FontAwesomeIcon
													icon={faCheck}
												/>
											}
											variant="contained"
											color="success"
											disabled={isSubmitting}
											type="submit"
										>
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
