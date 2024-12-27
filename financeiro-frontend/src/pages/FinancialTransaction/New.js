import { create } from "../../cruds/finantial_transaction";
import {
	cleanCurrency,
	removeEmptyValues,
} from "./Utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import IForm from "./Form";

export default function New() {
	const client = useSelector((state) => state.client);
	const navigate = useNavigate();

	const getIniitalState = () => {
		return {
			type: "",
			value: "",
			category_id: "",
			note: "",
			subscriber_id: "",
			cost_center_id: "",
			bank_account_id: "",
			payed: false,
			payment_date: dayjs(),
			periodicity_type: "",
			periodicity: "",
			recurrencies: 1,
		};
	};

	const onSubmit = (values) => {
		let formatted_values = {
			...values,
			value: cleanCurrency(values.value),
			client_id: parseInt(client),
			periodicity: values.periodicity != "" ? values.periodicity : null,
		};

		create(removeEmptyValues(formatted_values))
			.catch((err) => {
				Swal.fire("Ops", "Houve um erro ao salvar a conta", "error");
			})
			.then((res) => {
				Swal.fire("Sucesso", "Lançamento salvo com sucesso", "success");
				navigate("/financial-transaction");
			});
	};

	return (<IForm data={getIniitalState()} onSubmit={onSubmit}></IForm>)
}
