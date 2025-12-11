import "../../style/cliente.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button as ReactButton } from "react-bootstrap";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useEffect, useState } from "react";
import { list, remove } from "../../cruds/client";
import Swal from "sweetalert2";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setClient } from "../../store/actions";

export default function Cliente() {
  const [clients, setClients] = useState([]);
  const [reqParams, setReqParams] = useState({
    page: 0, rows: 5, search: "", client_id: useSelector(state => state.client)
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [reqParams]);

  const fetchData = async () => {
    await list(reqParams)
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => {
        Swal.fire(
          "Ops",
          "Houve um erro ao buscar a lista de clientes.",
          "error"
        );
      });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={reqParams.search}
            onChange={e => setReqParams({...reqParams, search: e.target.value})}
            className="fullwidth"
            placeholder="Busque pelo nome ou documento"
          />
        </span>
      </div>
    );
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
                "Houve um erro ao buscar a lista de clientes.",
                "error"
              );
            })
            .then((res) => {
              setClients(res.data);
            });
        }
      });
  };

  const onSetSelectedCliente = (id) => {
    dispatch(setClient(id, navigate));
  };

  const actionBody = (rowData) => {
    return (
      <div style={{ maxWidth: 200 }} className="d-flex justify-content-between">
        <Link
          to={`/client/edit/${rowData.id}`}
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
          <h1 className="screen-title">Clientes</h1>
        </div>
        <div className="body">
          <div className="database-header">
            <Link to={`/client/new`} type="button">
              <Button
                startIcon={<FontAwesomeIcon icon={faPlus} />}
                variant="contained"
                color="success"
              >
                Novo Cliente
              </Button>
            </Link>
          </div>
          <div style={{ width: "100%" }}>
            <DataTable
              value={clients}
              stripedRows
              showGridlines
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              globalFilterFields={["name", "type"]}
              header={header}
              emptyMessage="Não há registros."
            >
              <Column field="name" header="Nome"></Column>
              <Column header="Opções" body={actionBody}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
