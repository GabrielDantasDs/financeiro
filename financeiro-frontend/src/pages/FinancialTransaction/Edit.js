import { get, update } from "../../cruds/finantial_transaction";
import { cleanCurrency, removeEmptyValues } from "./Utils";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import IForm from "./Form";
import { useEffect, useState } from "react";

export default function Edit() {
	const [data, setData] = useState([]);
	const [initialState, setInitialState] = useState(null);
	const client = useSelector((state) => state.client);
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		getIniitalState(data);
	}, [data]);

	const fetchData = async () => {
		await get(params.id)
			.then((res) => {
				setData(res.data)
			})
			.catch((error) => {
				Swal.fire("Ops", "Houve um erro ao buscar os dados da transação.", "error");
				return;
			});
	};

	const getIniitalState = (data) => {
		setInitialState({
			type: data.type ?? "",
			value: data.value ?? "",
			category_id: data.category_id ?? "",
			note: data.note ?? "",
			subscriber_id: data.subscriber_id ?? "",
			cost_center_id: data.cost_center_id ?? "",
			bank_account_id: data.bank_account_id ?? "",
			payed: data.payed ?? false,
			payment_day: data.payment_day ? dayjs(data.payment_day) : dayjs(),
			periodicity: data.periodicity ?? null,
			periodicity_type: data.periodicity ? "RECORRENTE" : "UNICA",
			number_installments: data.installments ?? 1,
		});
	};

	const onSubmit = (values) => {
		let formatted_values = {
			...values,
			value: cleanCurrency(values.value),
			client_id: parseInt(client),
			periodicity: values.periodicity != "" ? values.periodicity : null,
		};

		update(params.id, removeEmptyValues(formatted_values))
			.catch((err) => {
				Swal.fire("Ops", "Houve um erro ao salvar a conta", "error");
			})
			.then((res) => {
				Swal.fire("Sucesso", "Lançamento salvo com sucesso", "success");
				navigate("/financial-transaction");
			});
	};

	return <IForm data={initialState} onSubmit={onSubmit}></IForm>;
}
