import "../../style/cliente.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useEffect, useState } from "react";
import { list, remove } from "../../cruds/cost-center";
import Swal from "sweetalert2";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Link } from "react-router-dom";
import ListSubheader from '@mui/material/ListSubheader'
import { useSelector } from "react-redux";

export default function List() {
  const [cost_centers, setCostCenters] = useState([]);
  const [reqParams, setReqParams] = useState({
    page: 0, rows: 5, search: "", client_id: useSelector(state => state.client)
  });

  useEffect(() => {
    fetchData();
  }, [reqParams]);

  const fetchData = async () => {
    await list(reqParams)
      .then((res) => {
        setCostCenters(res.data);
      })
      .catch((err) => {
        Swal.fire(
          "Ops",
          "Houve um erro ao buscar a lista de centros de custo.",
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
            placeholder="Busque pelo nome"
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
              setCostCenters(res.data);
            });
        }
      });
  };

  const actionBody = (rowData) => {
    return (
      <div style={{ maxWidth: 100 }} className="d-flex justify-content-between">
        <Link
          to={`/cost-center/edit/${rowData.id}`}
          type="button"
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
        </Link>
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
          <h1 className="screen-title">Centro de custo</h1>
        </div>
        <div className="body">
          <div className="database-header">
            <Link
              to="/cost-center/new"
              variant="contained"
              type="button"
              className="btn btn-success"
            >
              <FontAwesomeIcon style={{ marginRight: 5 }} icon={faPlus} />
              Novo centro de custo
            </Link>
          </div>
          <div style={{ width: "100%" }}>
            <DataTable
              value={cost_centers}
              stripedRows
              showGridlines
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              globalFilterFields={["cat_name"]}
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
