import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState, React, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { create, get, remove } from "../../cruds/finantial_transaction";
import { validate } from "./Utils";

import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faPrint } from "@fortawesome/free-solid-svg-icons/faPrint";
import "../../style/finantial.css";
import { formatBRLInput } from "../../Utils";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { list as listCategories } from "../../cruds/category";
import { get as getCliente } from "../../cruds/client";
import dayjs from "dayjs";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../../utils/ComponentToPrint";

export default function Finantial(props) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [finantials, setFinantials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataToPDF, setDataToPDF] = useState(null);
  const [printing, setPrinting] = useState(false);
  const [cliente, setCliente] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setPrinting(false),
  });

  useEffect(() => {
    async function fetchData() {
      const [finantialsl, categoriesl, clientel] = await Promise.all([
        get(params.id)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            Swal.fire("Ops", "Houve um erro ao buscar os dados.", "error");
            return;
          }),

        listCategories()
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            Swal.fire("Ops", "Houve um erro ao buscar os categorias.", "error");
            return;
          }),

        getCliente(params.id)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            Swal.fire("Ops", "Houve um erro ao buscar o cliente", "error");
            return;
          }),
      ]);

      setFinantials(finantialsl);
      setCategories(categoriesl);
      setCliente(clientel);

      setDataToPDF({
        cliente: clientel,
        finantials: finantialsl,
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (printing) {
      setTimeout(() => {
        handlePrint();
      }, 1000);
    }
  }, [printing]);

  const getIniitalState = () => {
    return {
      fin_type: "",
      fin_category: "",
      fin_value: "",
      fin_note: "",
      fin_date: dayjs(),
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

  const deleteRecord = (id) => {
    remove(id)
      .catch((error) => {
        Swal.fire("Ops", "Houve um erro ao remover esse registro.", "error");
        return;
      })
      .then((res) => {
        if (res.status == 200) {
          get(params.id)
            .catch((err) => {
              Swal.fire(
                "Ops",
                "Houve um erro ao buscar a lista de categorias.",
                "error"
              );
            })
            .then((res) => {
              setFinantials(res.data);
            });
        }
      });
  };

  const actionBody = (rowData) => {
    return (
      <div style={{ maxWidth: 200 }} className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-danger"
          onClick={(e) => {
            e.preventDefault();
            deleteRecord(rowData.id);
          }}
        >
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

  const onChangeFinDate = (e, setFieldValue) => {
    setFieldValue("fin_date", e);
  };

  const printPdf = () => {
    setPrinting(true);
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
                  <div className="form-group col-md-4">
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
                        {categories.map((cat, i) => {
                          return (
                            <MenuItem key={i} value={cat.id}>
                              {cat.cat_name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="form-group col-md-4">
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

                  <div className="form-group col-md-4">
                    <DatePicker
                      className="full-width"
                      onChange={(e) => onChangeFinDate(e, setFieldValue)}
                      value={values.fin_date}
                      error={touched.fin_date && errors.fin_date ? true : false}
                      onBlur={handleBlur}
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

        <div className="body">
          <div className="database-header">
            <Button
              onClick={(e) => {
                e.preventDefault();
                printPdf();
              }}
              startIcon={<FontAwesomeIcon icon={faPrint} />}
              color="primary"
              variant="contained"
            >
              PDF
            </Button>
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
              <Column
                field="fin_value"
                header="Valor"
                body={(rowData) => {
                  return Number(rowData.fin_value).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  });
                }}
              ></Column>
              <Column
                field="fin_category"
                header="Categoria"
                body={(rowData) => {
                  return categories.find(
                    (cat) => cat.id == rowData.fin_category_id
                  ).cat_name;
                }}
              ></Column>
              <Column field="fin_note" header="Nota"></Column>
              <Column
                field="fin_date"
                header="Data"
                body={(rowData) => {
                  return dayjs(rowData.fin_date).format("DD/MM/YYYY");
                }}
              ></Column>
              <Column header="Opções" body={actionBody}></Column>
            </DataTable>
          </div>
        </div>
      </div>
      <div style={!printing ? { display: "none" } : null}>
        {dataToPDF ? (
          <ComponentToPrint ref={componentRef} data={dataToPDF} />
        ) : null}
      </div>
    </div>
  );
}
