import { formatBRL } from "../../Utils";

export const validate = (values) => {
	const errors = {};

	const requiredValues = ["name", "value"];

	Object.keys(values).map((key, i) => {
		if (requiredValues.includes(key) && !values[key]) {
			errors[key] = "Required";
		}
	});

	return errors;
};

export const getInitialState = (currentClient, values = {}) => {
	return {
		name: values.name ?? "",
		value: values.value ? formatBRL(values.value) : "",
		client_id: currentClient ? parseInt(currentClient) : null,
		recurrency: 0
	};
};
