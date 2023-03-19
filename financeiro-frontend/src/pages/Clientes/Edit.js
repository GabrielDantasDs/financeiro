import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { edit, get } from "../../cruds/customer";
import { validate } from "./Utils";
import {
  formatCnpjCpfInput,
  formatTelefone,
  formatTelefoneInput,
  handleCepInput,
  handleViaCep,
  states,
} from "../../Utils";

import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

export default function Edit() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [customer, setCustomer] = useState();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      await get(params.id).then((res) => {
        setCustomer(res.data);
      });
    };
    fetchData();
  }, []);


  const getIniitalState = () => {
    return {
      cus_address: customer.cus_address,
      cus_city: customer.cus_city,
      cus_district: customer.cus_district,
      cus_documento: customer.cus_documento,
      cus_email: customer.cus_email,
      cus_name: customer.cus_name,
      cus_number: customer.cus_number,
      cus_state: customer.cus_state,
      cus_zip_code: customer.cus_zip_code,
      cus_phone: customer.cus_phone,
    };
  };

  const onSubmit = (values) => {
    edit(values)
      .catch((err) => {
        Swal.fire("Ops", "Houve um erro ao salvar o usuário", "error");
      })
      .then((res) => {
        Swal.fire("Sucesso", "Usuário salvo com sucesso", "success");
        navigate("/clientes/index");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="main">
      {customer != null ? (
        <div className="container">
          <div className="header">
            <h1 className="list_title">Clientes: Novo cliente</h1>
          </div>
          <div className="form">
            <Formik
              initialValues={getIniitalState()}
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
                <Form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <TextField
                        required
                        id="outlined-required"
                        label="Nome"
                        value={values.cus_name}
                        error={
                          touched.cus_name && errors.cus_name ? true : false
                        }
                        name="cus_name"
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
                        name="cus_email"
                        fullWidth
                        value={values.cus_email}
                        error={
                          touched.cus_email && errors.cus_email ? true : false
                        }
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
                        value={values.cus_phone}
                        error={
                          touched.cus_phone && errors.cus_phone ? true : false
                        }
                        name="cus_phone"
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(formatTelefoneInput(e))}
                        inputProps={{ maxLength: 15 }}
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <TextField
                        required
                        id="outlined-required"
                        label="Documento"
                        name="cus_documento"
                        fullWidth
                        value={values.cus_documento}
                        error={
                          touched.cus_documento && errors.cus_documento
                            ? true
                            : false
                        }
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(formatCnpjCpfInput(e))}
                        inputProps={{ maxLength: 18 }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <FormControl fullWidth>
                        <InputLabel id="select-state">UF</InputLabel>
                        <Select
                          labelId="select-state"
                          id="select-state"
                          value={values.cus_state}
                          name="cus_state"
                          label="UF"
                          onChange={handleChange}
                        >
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
                        required
                        id="outlined-required"
                        label="CEP"
                        name="cus_zip_code"
                        fullWidth
                        value={values.cus_zip_code}
                        error={
                          touched.cus_zip_code && errors.cus_zip_code
                            ? true
                            : false
                        }
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(handleCepInput(e));
                          handleViaCep(e.target.value, setFieldValue);
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <TextField
                        required
                        id="outlined-required"
                        label="Cidade"
                        name="cus_city"
                        fullWidth
                        value={values.cus_city}
                        error={
                          touched.cus_city && errors.cus_city ? true : false
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <TextField
                        required
                        id="outlined-required"
                        label="Bairro"
                        name="cus_district"
                        fullWidth
                        value={values.cus_district}
                        error={
                          touched.cus_district && errors.cus_district
                            ? true
                            : false
                        }
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <TextField
                        required
                        id="outlined-required"
                        label="Rua"
                        name="cus_address"
                        fullWidth
                        value={values.cus_address}
                        error={
                          touched.cus_address && errors.cus_address
                            ? true
                            : false
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <TextField
                        required
                        id="outlined-required"
                        label="Número"
                        name="cus_number"
                        fullWidth
                        value={values.cus_number}
                        error={
                          touched.cus_number && errors.cus_number ? true : false
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-row-reverse">
                    <Button
                      startIcon={<FontAwesomeIcon icon={faCheck} />}
                      variant="contained"
                      color="success"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Salvar
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : null}
    </div>
  );
}
