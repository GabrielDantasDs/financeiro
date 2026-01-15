import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { simpleList } from "../../cruds/product";
import { update, get } from "../../cruds/customers";
import { useEffect, useState } from "react";
import Form from "./Form";
import { getInitialState } from "./Utils";

export default function New() {
	const [isSubmitting, setSubmitting] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	const currentClient = useSelector((state) => state.client);
	const [products, setProducts] = useState([]);
	const [values, setValues] = useState({});
	const params = useParams();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);

		try {
			const [productsRes, valuesRes] = await Promise.all([
				simpleList(currentClient),
				get(params.id),
			]);

			setProducts(productsRes.data);
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

		await update(currentClient, values)
			.then((res) => {
				Swal.fire("Sucesso", "Usuário salvo com sucesso", "success");
				navigate("/customer");
			})
			.catch((err) => {
				Swal.fire(
					"Ops",
					err.response.data ?? "Houve um erro ao salvar o usuário",
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
			products={products}
		/>
	);
}
