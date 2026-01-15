import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form as FormFormik, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

import { validate } from "./Utils";
import {
  formatCnpjCpfInput,
  formatTelefoneInput,
  handleCepInput,
  handleViaCep,
  states,
} from "../../Utils";
import { useEffect } from "react";

export default function Form({ values, loading, submit, onSubmit, products }) {

  useEffect(() => {
    console.log(values)
  }, [values])

  const title = values && values.id ? 'Editar Fornecedor' : 'Novo Fornecedor'

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
              onSubmit(values);
            }}
          >
            {({
              values,

              errors,

              touched,

              handleChange,

              handleBlur,

              handleSubmit,

              setFieldValue,

              isSubmitting,
            }) => (
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
                      label="Email"
                      name="email"
                      fullWidth
                      value={values.email}
                      error={touched.email && errors.email ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <TextField
                      required
                      id="outlined-required"
                      label="Telefone"
                      fullWidth
                      value={values.phone}
                      error={touched.phone && errors.phone ? true : false}
                      name="phone"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const formatted = formatTelefoneInput(e);
                        if (typeof formatted === 'string') {
                          setFieldValue('phone', formatted);
                        } else if (formatted && formatted.target && typeof formatted.target.value !== 'undefined') {
                          setFieldValue('phone', formatted.target.value);
                        } else {
                          handleChange(e);
                        }
                      }}
                      inputProps={{ maxLength: 15 }}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <TextField
                      required
                      id="outlined-required"
                      label="Documento"
                      name="document"
                      fullWidth
                      value={values.document}
                      error={touched.document && errors.document ? true : false}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const formatted = formatCnpjCpfInput(e);
                        if (typeof formatted === 'string') {
                          setFieldValue('document', formatted);
                        } else if (formatted && formatted.target && typeof formatted.target.value !== 'undefined') {
                          setFieldValue('document', formatted.target.value);
                        } else {
                          handleChange(e);
                        }
                      }}
                      inputProps={{ maxLength: 18 }}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <FormControl fullWidth>
                      <InputLabel id="select-state">UF</InputLabel>
                      <Select labelId="select-state" id="select-state" value={values.state} name="state" label="UF" onChange={handleChange}>
                        {states.map((obj, i) => {
                          return (
                            <MenuItem key={i} value={obj.value}>
                              {obj.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="form-group col-md-6">
                    <TextField
                      id="outlined-required"
                      label="CEP"
                      name="zip_code"
                      fullWidth
                      value={values.zip_code}
                      error={touched.zip_code && errors.zip_code ? true : false}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const formatted = handleCepInput(e);
                        if (typeof formatted === 'string') {
                          setFieldValue('zip_code', formatted);
                        } else if (formatted && formatted.target && typeof formatted.target.value !== 'undefined') {
                          setFieldValue('zip_code', formatted.target.value);
                        } else {
                          handleChange(e);
                        }
                        handleViaCep(e.target.value, setFieldValue);
                      }}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <TextField
                      id="outlined-required"
                      label="Cidade"
                      name="city"
                      fullWidth
                      value={values.city}
                      error={touched.city && errors.city ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <TextField
                      id="outlined-required"
                      label="Bairro"
                      name="neighborhood"
                      fullWidth
                      value={values.neighborhood}
                      error={touched.neighborhood && errors.neighborhood ? true : false}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <TextField
                      id="outlined-required"
                      label="Rua"
                      name="address"
                      fullWidth
                      value={values.address}
                      error={touched.address && errors.address ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <TextField
                      id="outlined-required"
                      label="Número"
                      name="number"
                      fullWidth
                      value={values.number}
                      error={touched.number && errors.number ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="d-flex flex-row-reverse">
                  <Button startIcon={<FontAwesomeIcon icon={faCheck} />} variant="contained" color="success" disabled={submit} type="submit">
                    Salvar
                  </Button>
                </div>
              </FormFormik>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
