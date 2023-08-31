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
import { create } from "../../cruds/category";
import { validate } from "./Utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { list } from "../../cruds/cost-center";

export default function New() {
	const [isSubmitting, setSubmitting] = useState(false);
	const [costCenters, setCostCenters] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			await list().then((res) => {
				setCostCenters(res.data);
			});
		}

		fetchData();
	}, []);

	const getIniitalState = () => {
		return {
			cat_name: "",
			cat_id_cost_center: "",
		};
	};

	const onSubmit = (values) => {
		create(values)
			.catch((err) => {
				Swal.fire(
					"Ops",
					"Houve um erro ao salvar o categoria",
					"error"
				);
			})
			.then((res) => {
				Swal.fire("Sucesso", "Categorai salva com sucesso", "success");
				navigate("/category");
			})
			.finally(() => setSubmitting(false));
	};

	return (
		<div className="main">
			<div className="container">
				<div className="header">
					<h1 className="list_title">Categorias: Nova categoria</h1>
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
											value={values.cat_name}
											error={
												touched.cat_name &&
												errors.cat_name
													? true
													: false
											}
											name="cat_name"
											onBlur={handleBlur}
											fullWidth
											onChange={handleChange}
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
													values.cat_id_cost_center
												}
												name="cat_id_cost_center"
												label="Centro de custo "
												onChange={handleChange}
											>
												{costCenters.map((item, i) => {
													return (
														<MenuItem
															key={i}
															value={item.id}
														>
															{item.coc_name}
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
