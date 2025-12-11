import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { create } from "../../cruds/cost-center";
import { validate } from "./Utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { simpleList } from "../../cruds/category";
import { useSelector } from "react-redux";

export default function New() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const client = useSelector((state) => state.client) ;

  useEffect(() => {
    simpleList(client).then(res => {
      setCategories(res.data);
    }).catch(err => {
      Swal.fire('Ops', 'Houve um erro ao buscar as categorias.', 'error');
      return;
    })
  }, []);

  const getIniitalState = () => {
    return {
      name: "",
      category_id: "",
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
          <h1 className="screen-title">Centro de custo: Novo centro de custo</h1>
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
											<InputLabel id="select-state">
												Categoria *
											</InputLabel>
											<Select
												labelId="select-state"
												value={
													values.category_id
												}
												name="category_id"
												required
                        error={touched.category_id && errors.category_id ? true : false}
												label="Categoria"
												onChange={handleChange}
											>
												{categories.map((item, i) => {
													return (
														<MenuItem
															key={i}
															value={item.id}
														>
															{item.name}
														</MenuItem>
													);
												})}
											</Select>
										</FormControl>
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
