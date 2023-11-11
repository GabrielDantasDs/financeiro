export const validate = (values) => {
  const errors = {};

  Object.keys(values).map((key, i) => {
    if (key == "cus_email") {
      if (!values[key]) {
        errors[key] = "Required";
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[key])) {
        errors[key] = "Invalid email address";
      }
    } if (key == "cus_documento") {
      if(!/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/.test(values[key])
      ) {
        errors[key] = "Documento inválido";
      }
    } else {
      if (!values[key]) {
        errors[key] = "Required";
      }
    }
  });

  return errors;
};

export const goIndex = "/clientes"
