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
import { get, edit, getBankInstitutionList } from "../../cruds/bank-account";
import { validate } from "./Utils";

import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { types } from "./Utils";
import { useSelector } from "react-redux";

export default function Edit() {
	const [isSubmitting, setSubmitting] = useState(false);
	const [data, setData] = useState();
	const [bankInstitutionList, setBankInstitutionList] = useState([]);
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		get(params.id)
			.then((res) => {
				if (res.status == 200) {
					setData(res.data);
				}
			})
			.catch((error) => {
				Swal.fire(
					"Ops",
					"Houve um erro ao buscar os dados sobre a conta.",
					"error"
				);
				return;
			});

		getBankInstitutionList()
			.then((res) => {
				if (res.status === 200) {
					setBankInstitutionList(res.data);
				}
			})
			.catch((e) => {
				Swal.fire(
					"Ops",
					"Houve um erro ao buscar as instituições financeiras.",
					"error"
				);
				return;
			});
	}, []);

	const getIniitalState = () => {
		return {
			name: data.name ?? "",
			type: data.type ?? "",
			description: data.description ?? "",
			institution: data.institution ?? "",
		};
	};

	const onSubmit = (values) => {
		setSubmitting(true);

		edit(params.id, values)
			.then((res) => {
				Swal.fire("Sucesso", "Conta atualizada com sucesso", "success");
				navigate("/bank-account");
			})
			.catch((err) => {
				Swal.fire("Ops", "Houve um erro ao salvar o usuário", "error");
			})
			.finally(() => setSubmitting(false));
	};

	return (
		<>
			{data ? (
				<div className="main">
					<div className="container">
						<div className="header">
							<h1 className="screen-title">
								Conta bancária: Editar conta
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
														Tipo da conta
													</InputLabel>
													<Select
														labelId="select-state"
														id="select-state"
														value={values.type}
														label="Tipo da conta "
														name="type"
														onChange={handleChange}
													>
														{types.map((obj, i) => {
															return (
																<MenuItem
																	key={i}
																	value={
																		obj.key
																	}
																>
																	{obj.label}
																</MenuItem>
															);
														})}
													</Select>
												</FormControl>
											</div>
										</div>

										<div className="form-row">
											<div className="form-group col-md-6">
												<TextField
													id="outlined"
													label="Descrição"
													fullWidth
													value={values.description}
													error={
														touched.description &&
														errors.description
															? true
															: false
													}
													name="bac_description"
													onBlur={handleBlur}
													onChange={handleChange}
													inputProps={{
														maxLength: 70,
													}}
												/>
											</div>

											<div className="form-group col-md-6">
												<FormControl fullWidth>
													<InputLabel id="select-state">
														Instituição financeira
													</InputLabel>
													<Select
														labelId="select-state"
														id="select-state"
														value={
															values.institution
														}
														name="institution"
														label="Instituição financeira "
														onChange={handleChange}
													>
														{bankInstitutionList.map(
															(obj, i) => {
																return (
																	<MenuItem
																		key={i}
																		value={
																			obj.name
																		}
																	>
																		{
																			obj.fullName
																		}
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
				</div>
			) : null}
		</>
	);
}
