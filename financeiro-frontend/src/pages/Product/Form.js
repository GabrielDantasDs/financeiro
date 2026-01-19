import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { Form as FormFormik, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

import { validate } from "./Utils";
import { formatBRLInput } from "../../Utils";

export default function Form({ values, loading, submit, onSubmit }) {
	const title = values && values.id ? "Editar Produto" : "Novo Produto";

	return (
		<div className="main">
			<div className="container">
				<div className="header">
					<h1 className="screen-title">{title}</h1>
				</div>
				<div className="form">
					<Formik
						initialValues={values}
						enableReinitialize={true}
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
							isSubmitting,
						}) => (
							<FormFormik>
								<div className="form-row">
									<div className="form-group col-md-4">
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

									<div className="form-group col-md-4">
										<TextField
											required
											id="outlined-required"
											label="Valor"
											name="value"
											fullWidth
											value={values.value}
											error={
												touched.value && errors.value
													? true
													: false
											}
											onBlur={handleBlur}
											onChange={(e) =>
												handleChange(formatBRLInput(e))
											}
										/>
									</div>
									<div className="form-group col-md-4">
										<FormControl fullWidth>
											<InputLabel id="select-state">
												Recorrência
											</InputLabel>
											<Select
												labelId="select-state"
												id="select-state"
												value={values.recurrency}
												name="recurrency"
												label="Recorrência"
												onChange={handleChange}
											>
												{[0, 30, 60, 90].map(
													(obj, i) => {
														return (
															<MenuItem
																key={i}
																value={obj}
															>
																{obj == 0
																	? "Sem recorrência"
																	: obj +
																	  " Dias"}
															</MenuItem>
														);
													}
												)}
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
							</FormFormik>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}
