import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { create } from "../../cruds/category";
import { validate } from "./Utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function New() {
	const [isSubmitting, setSubmitting] = useState(false);
	const client = useSelector((state) => state.client);
	
	const types = [
		{
			key: "Despesa",
			value: "DESPESA"
		},
		{
			key: "Receita",
			value: "RECEITA"
		}
	];

	const navigate = useNavigate();

	const getIniitalState = () => {
		return {
			name: "",
			type: "",
			client_id: parseInt(client)
		};
	};

	const onSubmit = (values) => {
		create(values)
			.then((res) => {
				Swal.fire("Sucesso", "Categoria salva com sucesso", "success");
				navigate("/category");
			})
			.catch((err) => {
				Swal.fire(
					"Ops",
					"Houve um erro ao salvar o categoria",
					"error"
				);
				return;
			})
			.finally(() => setSubmitting(false));
	};

	return (
		<div className="main">
			<div className="container">
				<div className="header">
					<h1 className="screen-title">Categorias: Nova categoria</h1>
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
												touched.name &&
												errors.name
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
										<FormControl fullWidth>
											<InputLabel id="select-state">
												Tipo *
											</InputLabel>
											<Select
												labelId="select-state"
												value={
													values.type
												}
												name="type"
												required
												label="Tipo"
												onChange={handleChange}
											>
												{types.map((item, i) => {
													return (
														<MenuItem
															key={i}
															value={item.value}
														>
															{item.key}
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
