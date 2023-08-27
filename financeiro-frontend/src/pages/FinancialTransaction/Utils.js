export const validate = (values) => {
  const errors = {};
  const keys = [
    "fin_type",
    "fin_value",
    "fin_id_category",
    "subscriberId",
    "fin_id_center_cost",
    "fin_payed",
    "fin_payment_day",
    "fin_periodicity_type",
    "fin_number_installments",
  ];

  if (values.fin_periodicity_type === 'RECORRENTE') {
    keys.push("fin_number_installments");
  }

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
  // Remove non-numeric characters, except for period and comma
  const cleanedValue = currencyValue.replace(/[^\d,.]/g, "");

  // Replace comma with period (in case it's used as the decimal separator)
  const valueWithPeriod = cleanedValue.replace(",", ".");

  // Convert to a floating-point number
  const floatValue = parseFloat(valueWithPeriod);

  // Convert back to a string with a maximum of 2 decimal places
  const formattedValue = floatValue.toFixed(2);

  // Remove trailing zeros after the decimal point, if any
  const valueWithoutExtraZeros = formattedValue.replace(/\.?0*$/g, "");

  console.log('teste')
  return valueWithoutExtraZeros;
}
