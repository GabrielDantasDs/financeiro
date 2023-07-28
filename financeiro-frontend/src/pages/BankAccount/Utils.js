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