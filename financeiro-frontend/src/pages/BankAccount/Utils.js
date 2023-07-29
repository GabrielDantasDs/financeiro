export const validate = (values) => {
  const errors = {};

  Object.keys(values).map((key, i) => {
    if (key == "bac_name" || key == "bac_type") {
      if (!values[key]) {
        errors[key] = "Required";
      }

    }
  });

  return errors;
};

export const types = [
  {key: 'current_account', label: 'Conta corrente'},
  {key: 'savings_account', label: 'Poupança'}
];


export function mascaraMoeda(event) {
  const onlyDigits = event.target.value
    .split("")
    .filter(s => /\d/.test(s))
    .join("")
    .padStart(3, "0")
  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
  event.target.value = maskCurrency(digitsFloat);
  
  return event;
}

function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(valor)
}

export function cleanCurrency(currencyValue) {
  // Remove non-numeric characters, except for period and comma
  const cleanedValue = currencyValue.replace(/[^\d,.]/g, '');

  // Replace comma with period (in case it's used as the decimal separator)
  const valueWithPeriod = cleanedValue.replace(',', '.');

  // Convert to a floating-point number
  const floatValue = parseFloat(valueWithPeriod);

  // Convert back to a string with a maximum of 2 decimal places
  const formattedValue = floatValue.toFixed(2);

  // Remove trailing zeros after the decimal point, if any
  const valueWithoutExtraZeros = formattedValue.replace(/\.?0*$/g, '');

  return valueWithoutExtraZeros;
};

