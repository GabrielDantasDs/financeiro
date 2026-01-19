import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { update, get } from "../../cruds/product";
import { useEffect, useState } from "react";
import Form from "./Form";
import { getInitialState } from "./Utils";
import { cleanCurrency } from "../../Utils";

export default function Edit() {
	const [isSubmitting, setSubmitting] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	const currentClient = useSelector((state) => state.client);
	const [values, setValues] = useState({});
	const params = useParams();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);

		try {
			const valuesRes = await get(params.id);
			setValues(valuesRes.data);
		} catch (error) {
			Swal.fire(
				"Ops",
				error.response?.data || "Erro inesperado",
				"error"
			);
		}

		setLoading(false);
	};

	const onSubmit = async (values) => {
		setSubmitting(true);

		const formattedValues = {
			...values,
			value: cleanCurrency(values.value),
		}

		await update(params.id, formattedValues)
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
			values={getInitialState(currentClient, values)}
			loading={isLoading}
			submit={isSubmitting}
			onSubmit={onSubmit}
		/>
	);
}
