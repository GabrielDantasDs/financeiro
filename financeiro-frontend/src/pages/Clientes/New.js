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
import { create } from "../../cruds/client";
import { validate } from "./Utils";
import {
	formatCnpjCpfInput,
	formatTelefone,
	formatTelefoneInput,
	handleCepInput,
	handleViaCep,
	states,
} from "../../Utils";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function New() {
	const [isSubmitting, setSubmitting] = useState(false);
	const navigate = useNavigate();

	const getIniitalState = () => {
		return {
			address: "",
			city: "",
			district: "",
			document: "",
			email: "",
			name: "",
			number: "",
			state: "",
			zip_code: "",
			phone: "",
		};
	};

	const onSubmit = (values) => {
		create(values)
			.then((res) => {
				Swal.fire("Sucesso", "Cliente criado com sucesso", "success");
				navigate("/client");
			})
			.catch((err) => {
				Swal.fire("Ops", "Houve um erro ao salvar o usuário", "error");
			})

			.finally(() => setSubmitting(false));
	};

	return (
		<div className="main">
			<div className="container">
				<div className="header">
					<h1 className="screen-title">Clientes: Novo cliente</h1>
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
											required
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
											required
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
											required
											id="outlined-required"
											label="Bairro"
											name="district"
											fullWidth
											value={values.district}
											error={
												touched.district &&
												errors.district
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
											required
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
											required
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
