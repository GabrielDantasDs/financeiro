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
import { edit, get } from "../../cruds/cost-center";
import { validate } from "./Utils";
import {
  formatCnpjCpfInput,
  formatTelefoneInput,
  handleCepInput,
  handleViaCep,
  states,
} from "../../Utils";

import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

export default function Edit() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [category, setCategory] = useState();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      await get(params.id).then((res) => {
        setCategory(res.data);
      });
    };
    fetchData();
  }, []);

  const getIniitalState = () => {
    return {
      coc_name: category.coc_name
    };
  };

  const onSubmit = (values) => {
    edit(params.id, values)
      .catch((err) => {
        Swal.fire("Ops", "Houve um erro ao salvar o categoria", "error");
      })
      .then((res) => {
        Swal.fire("Sucesso", "Categoria salva com sucesso", "success");
        navigate("/categorias");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="main">
      {category != null ? (
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
                    <div className="form-group col-md-12">
                      <TextField
                        required
                        id="outlined-required"
                        label="Nome"
                        value={values.coc_name}
                        error={
                          touched.coc_name && errors.coc_name ? true : false
                        }
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
      ) : null}
    </div>
  );
}
