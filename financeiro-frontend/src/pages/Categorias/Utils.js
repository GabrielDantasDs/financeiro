export const validate = (values) => {
  const errors = {};
  console.log(values)
  Object.keys(values).map((key, i) => {
      if (!values[key]) {
        errors[key] = "Required";
      }
    
  });

  return errors;
};
