import "../../style/cliente.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button as ReactButton } from "react-bootstrap";
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useEffect, useState } from "react";
import { list, remove } from "../../cruds/subscriber";
import Swal from "sweetalert2";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setClient } from "../../store/actions";


export default function Cliente() {
  const [subscribers, setSubscribers] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    list()
      .catch((err) => {
        Swal.fire(
          "Ops",
          "Houve um erro ao buscar a lista de subscribers.",
          "error"
        );
      })
      .then((res) => {
        let formatted_subscribers = [];

        res.data.map((cliente, i) => {
          formatted_subscribers.push({
            id: cliente.id,
            sub_name: cliente.sub_name,
            sub_type: cliente.sub_type,
          });
        });

        setSubscribers(formatted_subscribers);
      });
  }, []);

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

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const deleteRecord = (id) => {
    remove(id)
      .catch((error) => {
        Swal.fire("Ops", "Houve um erro ao remover esse registro.", "error");
        return;
      })
      .then((res) => {
        if (res.status == 200) {
          list()
            .catch((err) => {
              Swal.fire(
                "Ops",
                "Houve um erro ao buscar a lista de categorias.",
                "error"
              );
            })
            .then((res) => {
              let formatted_subscribers = [];

              res.data.map((subscriber, i) => {
                formatted_subscribers.push({
                  id: subscriber.id,
                  sub_name: subscriber.sub_name,
                  sub_type: subscriber.sub_type,
                });
              });

              setSubscribers(res.data);
            });
        }
      });
  };

  const onSetSelectedCliente = (id) => {
        dispatch(setClient(id, navigate));
  }

  const actionBody = (rowData) => {
    return (
      <div style={{ maxWidth: 200 }} className="d-flex justify-content-between">
        <Link
          to={`/subscribers/edit/${rowData.id}`}
          type="button"
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
        </Link>
        <ReactButton
          variant="warning"
          onClick={(e) => {e.preventDefault();onSetSelectedCliente(rowData.id)}}
        >
          <FontAwesomeIcon icon="fa-solid fa-list" />
        </ReactButton>
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

  const header = renderHeader();

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h1 className="list_title">Fornecedores/Clientes</h1>
        </div>
        <div className="body">
          <div className="database-header">
            <Link to={`/subscriber/new`} type="button">
              <Button
                startIcon={<FontAwesomeIcon icon={faPlus} />}
                variant="contained"
                color="success"
              >
                Novo Fornecedor/Cliente
              </Button>
            </Link>
          </div>
          <div style={{ width: "100%" }}>
            <DataTable
              value={subscribers}
              stripedRows
              showGridlines
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              filters={filters}
              globalFilterFields={["sub_name", "sub_type"]}
              header={header}
              emptyMessage="Não há registros."
            >
              <Column field="sub_name" header="Nome"></Column>
              <Column field="sub_type" header="Tipo"></Column>
              <Column header="Opções" body={actionBody}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
