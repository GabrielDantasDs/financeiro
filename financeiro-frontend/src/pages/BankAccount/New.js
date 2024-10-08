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
  const client = useSelector((state) => state.client);
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
          function compare( a, b ) {
            if ( a.code < b.code ){
              return -1;
            }
            if ( a.code > b.code ){
              return 1;
            }
            return 0;
          }

          setBankInstitutionList(res.data.sort(compare));
        }
      });
  }, []);

  const getIniitalState = () => {
    return {
      name: "",
      type: "",
      description: "",
      institution: "",
      date_inicial_value: dayjs(),
      inicial_value: "",
      client_id: parseInt(client)
    };
  };

  const onSubmit = (values) => {
    create({ ...values, inicial_value: cleanCurrency(values.inicial_value), date_inicial_value: new Date(values.date_inicial_value) })
      .catch((err) => {
        Swal.fire("Ops", "Houve um erro ao salvar a conta", "error");
      })
      .then((res) => {
        Swal.fire("Sucesso", "Conta salva com sucesso", "success");
        navigate("/bank-account");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h1 className="screen-title">Conta bancária: Nova conta</h1>
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
                      value={values.name}
                      error={touched.name && errors.name ? true : false}
                      name="name"
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
                        value={values.type}
                        name="type"
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
                      value={values.description}
                      error={
                        touched.description && errors.description
                          ? true
                          : false
                      }
                      name="description"
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
                        value={values.institution}
                        name="institution"
                        label="Instituição financeira "
                        onChange={handleChange}
                      >
                        {bankInstitutionList.map((obj, i) => {
                          return (
                            <MenuItem key={i} value={obj.name}>
                              {obj.code } - {obj.fullName}
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
                      value={values.date_inicial_value}
                      error={
                        touched.date_inicial_value &&
                        errors.date_inicial_value
                          ? true
                          : false
                      }
                      name="date_inicial_value"
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
                      value={values.inicial_value}
                      error={
                        touched.inicial_value && errors.inicial_value
                          ? true
                          : false
                      }
                      name="inicial_value"
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
