import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { create } from "../../cruds/product";
import { useEffect, useState } from "react";
import Form from "./Form";
import { getInitialState } from "./Utils";
import { cleanCurrency } from "../BankAccount/Utils";

export default function New() {
	const [isSubmitting, setSubmitting] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	const currentClient = useSelector((state) => state.client);

	const onSubmit = async (values) => {
		setSubmitting(true);

		const formattedValues = {
			...values,
			value: cleanCurrency(values.value),
		};

		await create(formattedValues)
			.then((res) => {
				Swal.fire("Sucesso", "Produto salvo com sucesso", "success");
				navigate("/product");
			})
			.catch((err) => {
				Swal.fire(
					"Ops",
					err.response.data ?? "Houve um erro ao salvar o produto",
					"error"
				);
			})
			.finally(() => setSubmitting(false));
	};

	return (
		<Form
			values={getInitialState(currentClient)}
			loading={isLoading}
			submit={isSubmitting}
			onSubmit={onSubmit}
		/>
	);
}
