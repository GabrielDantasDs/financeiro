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
import { create, get } from "../../cruds/finantial_transaction";
import { validate } from "./Utils";

import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import "../../style/finantial.css";
import { formatBRLInput } from "../../Utils";
import { text } from "@fortawesome/fontawesome-svg-core";

export default function Finantial(props) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [finantials, setFinantials] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    get(params.id)
      .then((res) => {
        setFinantials(res.data);
      })
      .catch((err) => {
        Swal.fire("Ops", "Houve um erro ao buscar os dados.", "error");
        return;
      });
  }, []);

  const getIniitalState = () => {
    return {
      fin_type: "",
      fin_category: "",
      fin_value: "",
      fin_note: "",
      fin_customer: params.id,
    };
  };

  const onSubmit = (values) => {
    create(values)
      .catch((err) => {
        Swal.fire("Ops", "Houve um erro ao salvar a transação", "error");
      })
      .then((res) => {
        Swal.fire("Sucesso", "Transação salva com sucesso", "success");

        get(params.id)
          .then((res) => {
            setFinantials(res.data);
          })
          .catch((err) => {
            Swal.fire("Ops", "Houve um erro ao buscar os dados.", "error");
            return;
          });
      })
      .finally(() => setSubmitting(false));
  };

  const actionBody = (rowData) => {
    return (
      <div style={{ maxWidth: 200 }} className="d-flex justify-content-between">
        <button type="button" className="btn btn-danger">
          <FontAwesomeIcon icon="fa-solid fa-trash" />
        </button>
      </div>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Busque pelo nome ou doc"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h1 className="list_title">Financeiro do cliente</h1>
        </div>
        <div className="form form-container">
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
            }) => (
              <Form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <FormControl fullWidth>
                      <InputLabel id="select-type">Tipo *</InputLabel>
                      <Select
                        labelId="select-type"
                        id="select-type"
                        value={values.fin_type}
                        name="fin_type"
                        label="Tipo"
                        onChange={handleChange}
                      >
                        <MenuItem value={"Entrada"}>Entrada</MenuItem>
                        <MenuItem value={"Saida"}>Saída</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="form-group col-md-6">
                    <TextField
                      required
                      type={"text"}
                      id="outlined-required"
                      label="Valor"
                      name="fin_value"
                      fullWidth
                      value={values.fin_value}
                      error={
                        touched.fin_value && errors.fin_value ? true : false
                      }
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(formatBRLInput(e))}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <FormControl fullWidth>
                      <InputLabel id="select-type-category">
                        Categoria *
                      </InputLabel>
                      <Select
                        labelId="select-type-category"
                        id="select-type-category"
                        value={values.fin_category}
                        name="fin_category"
                        label="Categoria"
                        onChange={handleChange}
                      >
                        <MenuItem value={"Categoria_1"}>Categoria 1</MenuItem>
                        <MenuItem value={"Categoria_2"}>Categoria 2</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="form-group col-md-6">
                    <TextField
                      required
                      id="outlined-required"
                      label="Nota"
                      name="fin_note"
                      fullWidth
                      multiline
                      value={values.fin_note}
                      error={touched.fin_note && errors.fin_note ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="d-flex flex-row-reverse">
                  <Button
                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                    variant="contained"
                    color="success"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Adicionar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="datatable-container">
          <DataTable
            value={finantials}
            stripedRows
            showGridlines
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
            filters={filters}
            globalFilterFields={["cus_name", "cus_documento"]}
            header={header}
            emptyMessage="Não há registros."
          >
            <Column field="fin_type" header="Tipo"></Column>
            <Column field="fin_value" header="Valor"></Column>
            <Column field="fin_category" header="Categoria"></Column>
            <Column field="fin_note" header="Nota"></Column>
            <Column header="Opções" body={actionBody}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}
