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
import { create, getBankInstitutionList } from "../../cruds/bank-account";
import { mascaraMoeda, validate, cleanCurrency } from "./Utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { types } from "./Utils";
import { useSelector } from "react-redux";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";

export default function New() {
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const client = useSelector((state) => state.client.client);
  const [bankInstitutionList, setBankInstitutionList] = useState([]);

  useEffect(() => {
    getBankInstitutionList()
      .catch((e) => {
        Swal.fire(
          "Ops",
          "Houve um erro ao buscar as instituições financeiras.",
          "error"
        );
        return;
      })
      .then((res) => {
        if (res.status === 200) {
          setBankInstitutionList(res.data);
        }
      });
  }, []);

  const getIniitalState = () => {
    return {
      bac_id_client: null,
      bac_name: "",
      bac_type: "",
      bac_description: "",
      bac_institution: "",
      bac_date_inicial_value: dayjs(),
      bac_inicial_value: "",
    };
  };

  const onSubmit = (values) => {
    create({ ...values, bac_id_client: parseInt(client), bac_inicial_value: cleanCurrency(values.bac_inicial_value), bac_date_inicial_value: new Date(values.bac_date_inicial_value) })
      .catch((err) => {
        Swal.fire("Ops", "Houve um erro ao salvar a conta", "error");
      })
      .then((res) => {
        Swal.fire("Sucesso", "Conta salva com sucesso", "success");
        navigate("/bank-account/index");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h1 className="list_title">Conta bancária: Nova conta</h1>
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
                      value={values.bac_name}
                      error={touched.bac_name && errors.bac_name ? true : false}
                      name="bac_name"
                      onBlur={handleBlur}
                      fullWidth
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <FormControl fullWidth>
                      <InputLabel id="select-state">Tipo da conta</InputLabel>
                      <Select
                        labelId="select-state"
                        id="select-state"
                        value={values.bac_type}
                        name="bac_type"
                        label="Tipo da conta "
                        onChange={handleChange}
                      >
                        {types.map((obj, i) => {
                          return (
                            <MenuItem key={i} value={obj.key}>
                              {obj.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <TextField
                      id="outlined"
                      label="Descrição"
                      fullWidth
                      value={values.bac_description}
                      error={
                        touched.bac_description && errors.bac_description
                          ? true
                          : false
                      }
                      name="bac_description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{ maxLength: 70 }}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <FormControl fullWidth>
                      <InputLabel id="select-state">
                        Instituição financeira
                      </InputLabel>
                      <Select
                        labelId="select-state"
                        id="select-state"
                        value={values.bac_institution}
                        name="bac_institution"
                        label="Instituição financeira "
                        onChange={handleChange}
                      >
                        {bankInstitutionList.map((obj, i) => {
                          return (
                            <MenuItem key={i} value={obj.name}>
                              {obj.fullName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <TextField
                      required
                      type="date"
                      id="outlined-required"
                      label="Data do valor inicial"
                      value={values.bac_date_inicial_value}
                      error={
                        touched.bac_date_inicial_value &&
                        errors.bac_date_inicial_value
                          ? true
                          : false
                      }
                      name="bac_date_inicial_value"
                      onBlur={handleBlur}
                      fullWidth
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <TextField
                      required
                      id="outlined-required"
                      label="Valor inicial"
                      value={values.bac_inicial_value}
                      error={
                        touched.bac_inicial_value && errors.bac_inicial_value
                          ? true
                          : false
                      }
                      name="bac_inicial_value"
                      onBlur={handleBlur}
                      fullWidth
                      onChange={e => handleChange(mascaraMoeda(e))}
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
