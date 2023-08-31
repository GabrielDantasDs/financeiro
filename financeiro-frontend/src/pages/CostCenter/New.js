import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { create } from "../../cruds/cost-center";
import { validate } from "./Utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function New() {
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const getIniitalState = () => {
    return {
      coc_name: "",
    };
  };

  const onSubmit = (values) => {
    create(values)
      .catch((err) => {
        Swal.fire("Ops", "Houve um erro ao salvar o centro de custo", "error");
      })
      .then((res) => {
        Swal.fire("Sucesso", "Centro de custo salvo com sucesso", "success");
        navigate("/cost-center");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h1 className="list_title">Centro de custo: Novo centro de custo</h1>
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
                  <div className="form-group col-md-12">
                    <TextField
                      required
                      id="outlined-required"
                      label="Nome"
                      value={values.coc_name}
                      error={touched.coc_name && errors.coc_name ? true : false}
                      name="coc_name"
                      onBlur={handleBlur}
                      fullWidth
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
