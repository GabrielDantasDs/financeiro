import "../../style/cliente.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useEffect, useState } from "react";
import { list } from "../../cruds/customer";
import Swal from "sweetalert2";

export default function Cliente() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    list()
      .catch((err) => {
        Swal.fire(
          "Ops",
          "Houve um erro ao buscar a lista de clientes.",
          "error"
        );
      })
      .then((res) => {
        let formatted_clientes = [];

        res.data.map((cliente, i) => {
          formatted_clientes.push({
            id: cliente.id,
            cus_name: cliente.cus_name,
            cus_email: cliente.cus_email,
            cus_documento: cliente.cus_documento,
          });
        });

        setClientes(formatted_clientes);
      });
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "cus_name", headerName: "Nome", width: 130 },
    { field: "cus_email", headerName: "Email", width: 130 },
    { field: "cus_documento", headerName: "Documento", width: 130 },
  ];

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h1 className="list_title">Clientes</h1>
        </div>
        <div className="body">
          <div className="database-header">
            <Button
              href="/clientes/new"
              startIcon={<FontAwesomeIcon icon={faPlus} />}
              variant="contained"
              color="success"
            >
              Novo cliente
            </Button>
          </div>
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              sx={{
                height: "100%",
              }}
              localeText={{
                toolbarFilters: "Filtros",
                toolbarFiltersLabel: "Filtros",
                filterPanelAddFilter: "Add filter",
                filterPanelDeleteIconLabel: "Delete",
                filterPanelColumns: "Colunas",
                filterPanelInputLabel: "Valor",
                filterPanelInputPlaceholder: "Valor a ser filtrado",
                filterOperatorContains: "contém",
                filterOperatorEquals: "igual",
                filterOperatorStartsWith: "começa com",
                filterOperatorEndsWith: "termina com",
                filterOperatorIs: "é",
                filterOperatorNot: "não é",
                filterOperatorAfter: "está depois",
                filterOperatorOnOrAfter: "está em ou depois",
                filterOperatorBefore: "está antes",
                filterOperatorOnOrBefore: "está em ou antes",
                filterOperatorIsEmpty: "está vazio",
                filterOperatorIsNotEmpty: "não estã vazio",
                filterOperatorIsAnyOf: "qualquer um",
              }}
              components={{ Toolbar: GridToolbar }}
              rows={clientes}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </div>
  );
}
