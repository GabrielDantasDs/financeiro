import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { simpleList } from "../../cruds/product";
import { create } from "../../cruds/suppliers";
import { useEffect, useState } from "react";
import Form from "./Form";
import { getInitialState } from "./Utils";

export default function New() {
	const [isSubmitting, setSubmitting] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	const currentClient = useSelector((state) => state.client);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);

		await simpleList(currentClient)
			.then((res) => {
				setProducts(res.data);
			})
			.catch((error) => {
				Swal.fire("Ops", error.response.data, "error");
			});

		setLoading(false);
	};

	const onSubmit = async (values) => {
		setSubmitting(true);

		await create(values)
			.then((res) => {
				Swal.fire("Sucesso", "Fornecedor salvo com sucesso", "success");
				navigate("/supplier");
			})
			.catch((err) => {
				Swal.fire("Ops", err.response.data ?? "Houve um erro ao salvar o fornecedor", "error");
			})
			.finally(() => setSubmitting(false));
	};

	return (
		<Form
			values={getInitialState(currentClient)}
			loading={isLoading}
			submit={isSubmitting}
			onSubmit={onSubmit}
			products={products}
		/>
	);
}

