import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { create } from "../../cruds/subscriber";
import { validate } from "./Utils";
import {
  formatCnpjCpfInput,
  formatTelefone,
  formatTelefoneInput,
  handleCepInput,
  handleViaCep,
  states
} from "../../Utils";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function New() {
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const client = useSelector((state) => state.client.client)

  const getIniitalState = () => {
    return {
      sub_name: "",
      sub_document: "",
      sub_phone: "",
      sub_address: "",
      sub_district: "",
      sub_state: "",
      sub_number: "",
      sub_city: "",
      sub_type: "",
      sub_id_client: parseInt(client),
    };
  };

  const onSubmit = (values) => {
    console.log(values)

    create(values)
      .catch((err) => {
        Swal.fire("Ops", "Houve um erro ao salvar o usuário", "error");
      })
      .then((res) => {
        Swal.fire("Sucesso", "Usuário salvo com sucesso", "success");
        navigate("/subscriber");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h1 className="list_title">Fornecedor/Cliente: Novo Fornecedor/Cliente</h1>
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
                      value={values.sub_name}
                      error={touched.sub_name && errors.sub_name ? true : false}
                      name="sub_name"
                      onBlur={handleBlur}
                      fullWidth
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <FormControl fullWidth>
                      <InputLabel id="select-state">Tipo</InputLabel>
                      <Select
                        labelId="select-state"
                        id="select-state"
                        value={values.sub_type}
                        name="sub_type"
                        label="Tipo"
                        onChange={handleChange}
                      >
                        <MenuItem value={'Fornecedor'}>Fornecedor</MenuItem>
                        <MenuItem value={'Cliente'}>Cliente</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <TextField
                      required
                      id="outlined-required"
                      label="Telefone"
                      fullWidth
                      value={values.sub_phone}
                      error={
                        touched.sub_phone && errors.sub_phone ? true : false
                      }
                      name="sub_phone"
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
                      name="sub_document"
                      fullWidth
                      value={values.sub_document}
                      error={
                        touched.sub_document && errors.sub_document
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
                        value={values.sub_state}
                        name="sub_state"
                        label="UF"
                        onChange={handleChange}
                      >
                        {states.map((obj,i) => {
                          return <MenuItem key={i} value={obj.value}>{obj.label}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="form-group col-md-6">
                    <TextField
                      required
                      id="outlined-required"
                      label="CEP"
                      name="sub_zip_code"
                      fullWidth
                      value={values.sub_zip_code}
                      error={
                        touched.sub_zip_code && errors.sub_zip_code
                          ? true
                          : false
                      }
                      onBlur={handleBlur}
                      onChange={(e) => {handleChange(handleCepInput(e)); handleViaCep(e.target.value, setFieldValue)}}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <TextField
                      required
                      id="outlined-required"
                      label="Cidade"
                      name="sub_city"
                      fullWidth
                      value={values.sub_city}
                      error={touched.sub_city && errors.sub_city ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <TextField
                      required
                      id="outlined-required"
                      label="Bairro"
                      name="sub_district"
                      fullWidth
                      value={values.sub_district}
                      error={
                        touched.sub_district && errors.sub_district
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
                      name="sub_address"
                      fullWidth
                      value={values.sub_address}
                      error={
                        touched.sub_address && errors.sub_address ? true : false
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
                      name="sub_number"
                      fullWidth
                      value={values.sub_number}
                      error={
                        touched.sub_number && errors.sub_number ? true : false
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
    </div>
  );
}
