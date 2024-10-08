export const validate = (values) => {
	const errors = {};
	const keys = ["type", "value", "category_id", "cost_center_id", "payed", "payment_day", "bank_account_id"];

	Object.keys(values).map((key, i) => {
		if (keys.includes(key)) {
			if (values[key] === "" || values[key] === null) {
				errors[key] = "Required";
			}
		}
	});

	return errors;
};

export function mascaraMoeda(event) {
	const onlyDigits = event.target.value
		.split("")
		.filter((s) => /\d/.test(s))
		.join("")
		.padStart(3, "0");
	const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
	event.target.value = maskCurrency(digitsFloat);

	return event;
}

export function maskCurrency(valor, locale = "pt-BR", currency = "BRL") {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
	}).format(valor);
}

export function cleanCurrency(currencyValue) {
	console.log(currencyValue);
	// Remove tudo que não é número ou pontuação relevante
	const cleanedValue = currencyValue.replace(/[^\d.,]/g, "");
	console.log(cleanedValue);
	// Se existirem separadores de milhares, remover
	const valueWithoutThousandSeparator = cleanedValue.replace(/\./g, "");
	console.log(valueWithoutThousandSeparator);
	// Substituir a vírgula decimal (se for o caso) por um ponto
	const valueWithPeriod = valueWithoutThousandSeparator.replace(",", ".");
	console.log(valueWithPeriod);
	// Converter para número float
	const floatValue = parseFloat(valueWithPeriod);
	console.log(floatValue);
	// Se não for um número válido, retornar "0" ou algum valor padrão
	if (isNaN(floatValue)) return "0";

	// Formatar com duas casas decimais
	const formattedValue = floatValue.toFixed(2);

	// Remover zeros desnecessários
	return formattedValue.replace(/\.?0*$/g, "");
}

export function removeEmptyValues(values) {
	for (const [key, value] of Object.entries(values)) {
		if (value === null || value === "") {
			delete values[key];
		}

		if (key == "periodicity_type") {
			delete values[key];
		}
	}

	return values;
}
