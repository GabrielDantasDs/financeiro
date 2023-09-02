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
import {
	formatCnpjCpfInput,
	formatTelefone,
	formatTelefoneInput,
	handleCepInput,
	handleViaCep,
	states,
} from "../../Utils";

import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { types } from "./Utils";
import { useSelector } from "react-redux";

export default function Edit() {
	const [isSubmitting, setSubmitting] = useState(false);
	const [data, setData] = useState();
  const [bankInstitutionList, setBankInstitutionList] = useState([]);
	const navigate = useNavigate();
	const client = useSelector((state) => state.client.client);
	const params = useParams();

	useEffect(() => {
		get(params.id, { client: client })
			.catch((error) => {
				Swal.fire(
					"Ops",
					"Houve um erro ao buscar os dados sobre a conta.",
					"error"
				);
				return;
			})
			.then((res) => {
				if (res.status == 200) {
					setData(res.data);
				}
			});

		getBankInstitutionList()
			.catch((e) => {
				Swal.fire(
					"Ops",
					"Houve um erro ao buscar as instituições financeiras.",
					"error"
				);
				return;
			})
			.then((res) => {
				if (res.status === 200) {
					setBankInstitutionList(res.data);
				}
			});
	}, []);

	const getIniitalState = () => {
		return {
			bac_id_client: parseInt(client),
			bac_name: data.bac_name ?? "",
			bac_type: data.bac_type ?? "",
			bac_description: data.bac_description ?? "",
			bac_institution: data.bac_institution ?? "",
		};
	};

	const onSubmit = (values) => {
		setSubmitting(true);

		edit(params.id, values)
			.catch((err) => {
				Swal.fire("Ops", "Houve um erro ao salvar o usuário", "error");
			})
			.then((res) => {
				Swal.fire("Sucesso", "Conta atualizada com sucesso", "success");
				navigate("/bank-account");
			})
			.finally(() => setSubmitting(false));
	};

	return (
		<>
			{data ? (
				<div className="main">
					<div className="container">
						<div className="header">
							<h1 className="list_title">
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
													value={values.bac_name}
													error={
														touched.bac_name &&
														errors.bac_name
															? true
															: false
													}
													name="bac_name"
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
														value={values.bac_type}
														label="Tipo da conta "
														name="bac_type"
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
													value={
														values.bac_description
													}
													error={
														touched.bac_description &&
														errors.bac_description
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
															values.bac_institution
														}
														name="bac_institution"
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
