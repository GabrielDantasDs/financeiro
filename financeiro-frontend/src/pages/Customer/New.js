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
import { create } from "../../cruds/customers";
import { validate } from "./Utils";
import {
	formatCnpjCpfInput,
	formatTelefoneInput,
	handleCepInput,
	handleViaCep,
	states,
} from "../../Utils";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { simpleList } from "../../cruds/product";

export default function New() {
	const [isSubmitting, setSubmitting] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	const curretClient = null;
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);

		await simpleList().then(res => {
			setProducts(res.data);
		}).catch(error => {
			Swal.fire("Ops", error.response.data, "error");
		});

		setLoading(false);
	};

	const getInitialState = () => {
		return {
			name: "",
			document: "",
			email: "",
			phone: "",
			address: "",
			neighborhood: "",
			state: "",
			number: "",
			city: "",
			client_id: curretClient.id,
		};
	};

	const onSubmit = async (values) => {
		setSubmitting(true);

		await create(values)
			.catch((err) => {
				Swal.fire("Ops", "Houve um erro ao salvar o usuário", "error");
			})
			.then((res) => {
				Swal.fire("Sucesso", "Usuário salvo com sucesso", "success");
				navigate("/client");
			})
			.finally(() => setSubmitting(false));

		setSubmitting(false);
	};

	return (
		<div className="main">
			<div className="container">
				<div className="header">
					<h1 className="screen-title">Novo Cliente</h1>
				</div>
				<div className="form">
					<Formik
						initialValues={getInitialState()}
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
											value={values.name}
											error={
												touched.name && errors.name
													? true
													: false
											}
											name="name"
											onBlur={handleBlur}
											fullWidth
											onChange={handleChange}
										/>
									</div>

									<div className="form-group col-md-6">
										<TextField
											required
											id="outlined-required"
											label="Email"
											name="email"
											fullWidth
											value={values.email}
											error={
												touched.email && errors.email
													? true
													: false
											}
											onBlur={handleBlur}
											onChange={handleChange}
										/>
									</div>
								</div>

								<div className="form-row">
									<div className="form-group col-md-6">
										<TextField
											required
											id="outlined-required"
											label="Telefone"
											fullWidth
											value={values.phone}
											error={
												touched.phone && errors.phone
													? true
													: false
											}
											name="phone"
											onBlur={handleBlur}
											onChange={(e) =>
												handleChange(
													formatTelefoneInput(e)
												)
											}
											inputProps={{ maxLength: 15 }}
										/>
									</div>

									<div className="form-group col-md-6">
										<TextField
											required
											id="outlined-required"
											label="Documento"
											name="document"
											fullWidth
											value={values.document}
											error={
												touched.document &&
												errors.document
													? true
													: false
											}
											onBlur={handleBlur}
											onChange={(e) =>
												handleChange(
													formatCnpjCpfInput(e)
												)
											}
											inputProps={{ maxLength: 18 }}
										/>
									</div>
								</div>

								<div className="form-row">
									<div className="form-group col-md-6">
										<FormControl fullWidth>
											<InputLabel id="select-state">
												UF
											</InputLabel>
											<Select
												labelId="select-state"
												id="select-state"
												value={values.state}
												name="state"
												label="UF"
												onChange={handleChange}
											>
												{states.map((obj, i) => {
													return (
														<MenuItem
															key={i}
															value={obj.value}
														>
															{obj.label}
														</MenuItem>
													);
												})}
											</Select>
										</FormControl>
									</div>

									<div className="form-group col-md-6">
										<TextField
											id="outlined-required"
											label="CEP"
											name="zip_code"
											fullWidth
											value={values.zip_code}
											error={
												touched.zip_code &&
												errors.zip_code
													? true
													: false
											}
											onBlur={handleBlur}
											onChange={(e) => {
												handleChange(handleCepInput(e));
												handleViaCep(
													e.target.value,
													setFieldValue
												);
											}}
										/>
									</div>
								</div>

								<div className="form-row">
									<div className="form-group col-md-6">
										<TextField
											id="outlined-required"
											label="Cidade"
											name="city"
											fullWidth
											value={values.city}
											error={
												touched.city && errors.city
													? true
													: false
											}
											onBlur={handleBlur}
											onChange={handleChange}
										/>
									</div>

									<div className="form-group col-md-6">
										<TextField
											id="outlined-required"
											label="Bairro"
											name="neighborhood"
											fullWidth
											value={values.neighborhood}
											error={
												touched.neighborhood &&
												errors.neighborhood
													? true
													: false
											}
											onChange={handleChange}
										/>
									</div>
								</div>

								<div className="form-row">
									<div className="form-group col-md-6">
										<TextField
											id="outlined-required"
											label="Rua"
											name="address"
											fullWidth
											value={values.address}
											error={
												touched.address &&
												errors.address
													? true
													: false
											}
											onBlur={handleBlur}
											onChange={handleChange}
										/>
									</div>

									<div className="form-group col-md-6">
										<TextField
											id="outlined-required"
											label="Número"
											name="number"
											fullWidth
											value={values.number}
											error={
												touched.number && errors.number
													? true
													: false
											}
											onBlur={handleBlur}
											onChange={handleChange}
										/>
									</div>
								</div>

								<div className="form-row">
									<div className="form-group col-md-12">
										<FormControl fullWidth>
											<InputLabel id="select-state">
												Produto de adesão
											</InputLabel>
											<Select
												labelId="select-state"
												id="select-state"
												value={values.product}
												name="state"
												label="Produto de adesão"
												onChange={handleChange}
											>
												{products.map((obj, i) => {
													return (
														<MenuItem
															key={i}
															value={obj.id}
														>
															{obj.name}
														</MenuItem>
													);
												})}
											</Select>
										</FormControl>
									</div>
								</div>

								<div className="d-flex flex-row-reverse">
									<Button
										startIcon={
											<FontAwesomeIcon icon={faCheck} />
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
		</div>
	);
}
