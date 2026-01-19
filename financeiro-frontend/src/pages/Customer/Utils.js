export const validate = (values) => {
	const errors = {};

	const requiredValues = ["name", "document", "email", "phone"];

	Object.keys(values).map((key, i) => {
		if (requiredValues.includes(values[key]) && !values[key]) {
			errors[key] = "Required";
		}
	});

	return errors;
};

export const getInitialState = (currentClient, values = {}) => {
	return {
		name: values.name ?? "",
		document: values.document ?? "",
		email: values.email ?? "",
		phone: values.phone ?? "",
		address: values.address ?? "",
		neighborhood: values.neighborhood ?? "",
		state: values.state ?? "",
		number: values.number ?? "",
		city: values.city ?? "",
        zip_code: values.zip_code ?? "",
		client_id: currentClient ? parseInt(currentClient) : null,
		product_id: values.product_id ?? ""
	};
};
