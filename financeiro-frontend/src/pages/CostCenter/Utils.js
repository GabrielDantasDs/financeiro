export const validate = (values) => {
  const errors = {};

  Object.keys(values).map((key, i) => {
      if (!values[key]) {
        errors[key] = "Required";
      }
    
  });

  return errors;
};
