import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Radio, RadioGroup, FormControlLabel, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { get, edit, getBankInstitutionList } from "../../cruds/bank-account";
import { validate } from "./Utils";

import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { types } from "./Utils";
import "../../style/bank-account.css";

export default function Edit() {
	const [isSubmitting, setSubmitting] = useState(false);
	const [isLoading, setLoading] = useState(true); // Add loading state
	const [data, setData] = useState();
	const [bankInstitutionList, setBankInstitutionList] = useState([]);
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		// Create promises for both API calls
		const fetchData = async () => {
			try {
				const [accountRes, institutionsRes] = await Promise.all([get(params.id), getBankInstitutionList()]);

				if (accountRes.status === 200) {
					setData(accountRes.data);
				}

				if (institutionsRes.status === 200) {
					const sortedInstitutions = institutionsRes.data.sort((a, b) => {
						if (a.code < b.code) return -1;
						if (a.code > b.code) return 1;
						return 0;
					});
					setBankInstitutionList(sortedInstitutions);
				}
			} catch (error) {
				Swal.fire("Ops", "Houve um erro ao carregar os dados.", "error");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [params.id]);

	const getIniitalState = () => {
		return {
			name: data.name ?? "",
			type: data.type ?? "",
			description: data.description ?? "",
			institution: data.institution ?? "",
			default: data.default ?? false,
		};
	};

	const onSubmit = (values) => {
		setSubmitting(true);
		values.default = values.default === "true";
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
			 {isLoading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : data ? (
				<div className="main">
					<div className="container">
						<div className="header">
							<h1 className="screen-title">Conta bancária: Editar conta</h1>
						</div>
						<div className="form">
							<Formik
								initialValues={getIniitalState()}
								validate={(values) => validate(values)}
								onSubmit={(values) => {
									onSubmit(values);
								}}>
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
												<TextField required id="outlined-required" label="Nome" value={values.name} error={touched.name && errors.name ? true : false} name="name" onBlur={handleBlur} fullWidth onChange={handleChange} />
											</div>

											<div className="form-group col-md-6">
												<FormControl fullWidth>
													<InputLabel id="select-state">Tipo da conta</InputLabel>
													<Select labelId="select-state" id="select-state" value={values.type} label="Tipo da conta " name="type" onChange={handleChange}>
														{types.map((obj, i) => {
															return (
																<MenuItem key={i} value={obj.key}>
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
													error={touched.description && errors.description ? true : false}
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
													<InputLabel id="select-state">Instituição financeira</InputLabel>
													<Select labelId="select-state" id="select-state" value={values.institution} name="institution" label="Instituição financeira " onChange={handleChange}>
														{bankInstitutionList.map((obj, i) => {
															return (
																<MenuItem key={i} value={obj.name}>
																	{obj.fullName}
																</MenuItem>
															);
														})}
													</Select>
												</FormControl>
											</div>
										</div>

										<div className="form-row">
											<div className="form-group col-md-6">
												<FormControl component="fieldset">
													<RadioGroup name="default" value={values.default} onChange={handleChange}>
														<FormControlLabel value={true} control={<Radio />} label="Definir como conta padrão" />
													</RadioGroup>
												</FormControl>
											</div>
										</div>

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
				</div>
			) : null}
		</>
	);
}
