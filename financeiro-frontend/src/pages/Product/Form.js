import { Button, TextField } from "@mui/material";
import { Form as FormFormik, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

import { validate } from "./Utils";
import { useEffect } from "react";
import { formatBRLInput } from "../../Utils";

export default function Form({ values, loading, submit, onSubmit }) {

  useEffect(() => {
    console.log(values)
  }, [values])

  const title = values && values.id ? 'Editar Produto' : 'Novo Produto'

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h1 className="screen-title">{title}</h1>
        </div>
        <div className="form">
          <Formik
            initialValues={values}
            enableReinitialize={true}
            validate={(values) => validate(values)}
            onSubmit={(values) => {
              onSubmit(values)
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <FormFormik>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <TextField
                      required
                      id="outlined-required"
                      label="Nome"
                      value={values.name}
                      error={touched.name && errors.name ? true : false}
                      name="name"
                      onBlur={handleBlur}
                      fullWidth
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <TextField
                      required
                      id="outlined-required"
                      label="Valor"
                      name="value"
                      fullWidth
                      value={values.value}
                      error={touched.value && errors.value ? true : false}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(formatBRLInput(e))}
                    />
                  </div>
                </div>

                <div className="d-flex flex-row-reverse">
                  <Button startIcon={<FontAwesomeIcon icon={faCheck} />} variant="contained" color="success" disabled={isSubmitting} type="submit">
                    Salvar
                  </Button>
                </div>
              </FormFormik>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
