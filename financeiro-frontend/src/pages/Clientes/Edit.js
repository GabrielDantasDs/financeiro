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
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { edit, get } from "../../cruds/client";
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
    console.log('dassda')
    async function fetchData() {
      await get(params.id).then((res) => {
        setCustomer(res.data);
      });
    }
    fetchData();
  }, []);

  const getIniitalState = () => {
    return {
      cli_address: customer.cli_address,
      cli_city: customer.cli_city,
      cli_district: customer.cli_district,
      cli_document: customer.cli_document,
      cli_email: customer.cli_email,
      cli_name: customer.cli_name,
      cli_number: customer.cli_number,
      cli_state: customer.cli_state,
      cli_zip_code: customer.cli_zip_code,
      cli_phone: customer.cli_phone,
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
                        value={values.cli_name}
                        error={
                          touched.cli_name && errors.cli_name ? true : false
                        }
                        name="cli_name"
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
                        name="cli_email"
                        fullWidth
                        value={values.cli_email}
                        error={
                          touched.cli_email && errors.cli_email ? true : false
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
                        value={values.cli_phone}
                        error={
                          touched.cli_phone && errors.cli_phone ? true : false
                        }
                        name="cli_phone"
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
                        name="cli_document"
                        fullWidth
                        value={values.cli_document}
                        error={
                          touched.cli_document && errors.cli_document
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
                          value={values.cli_state}
                          name="cli_state"
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
                        name="cli_zip_code"
                        fullWidth
                        value={values.cli_zip_code}
                        error={
                          touched.cli_zip_code && errors.cli_zip_code
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
                        name="cli_city"
                        fullWidth
                        value={values.cli_city}
                        error={
                          touched.cli_city && errors.cli_city ? true : false
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
                        name="cli_district"
                        fullWidth
                        value={values.cli_district}
                        error={
                          touched.cli_district && errors.cli_district
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
                        name="cli_address"
                        fullWidth
                        value={values.cli_address}
                        error={
                          touched.cli_address && errors.cli_address
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
                        name="cli_number"
                        fullWidth
                        value={values.cli_number}
                        error={
                          touched.cli_number && errors.cli_number ? true : false
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-row-reverse">
                    <Button
                      startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                      variant="contained"
                      color="danger"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Voltar
                    </Button>
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
