import "../../style/cliente.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useEffect, useState } from "react";
import { list, remove } from "../../cruds/bank-account";
import Swal from "sweetalert2";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import { types } from "./Utils";

export default function List() {
  const [bank_accounts, setBankAccounts] = useState([]);
  const [reqParams, setReqParams] = useState({
    page: 0, rows: 5, search: "", client_id: useSelector(state => state.client)
  });

  useEffect(() => {
    fetchData();
  }, [reqParams]);

  const fetchData = async () => {
    await list(reqParams)
      .then((res) => {
        setBankAccounts(res.data);
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
            placeholder="Busque pelo nome ou doc"
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
                "Houve um erro ao buscar a lista de categorias.",
                "error"
              );
            })
            .then((res) => {
              let formatted_bank_accounts = [];

              res.data.map((cliente, i) => {
                formatted_bank_accounts.push({
                  id: cliente.id,
                  name: cliente.name,
                  email: cliente.email,
                  document: cliente.document,
                });
              });

              setBankAccounts(res.data);
            });
        }
      });
  };

  const actionBody = (rowData) => {
    return (
      <div style={{ maxWidth: 200 }} className="d-flex justify-content-between">
        <Link
          to={`/bank-account/edit/${rowData.id}`}
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
          <h1 className="screen-title">Conta bancárias</h1>
        </div>
        <div className="body">
          <div className="database-header">
            <Link to={`/bank-account/new`} type="button">
              <Button
                startIcon={<FontAwesomeIcon icon={faPlus} />}
                variant="contained"
                color="success"
              >
                Nova conta
              </Button>
            </Link>
          </div>
          <div style={{ width: "100%" }}>
            <DataTable
              value={bank_accounts}
              stripedRows
              showGridlines
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              header={header}
              emptyMessage="Não há registros."
            >
              <Column field="name" header="Nome"></Column>
              <Column field="type" header="Tipo" body={(rowData) => 
                types.find(x => x.key == rowData.type).label
              }></Column>
              <Column header="Opções" body={actionBody}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
