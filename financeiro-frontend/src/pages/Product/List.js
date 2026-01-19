import "../../style/cliente.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button as ReactButton } from "react-bootstrap";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useEffect, useState } from "react";
import { list, remove } from "../../cruds/product";
import Swal from "sweetalert2";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setClient } from "../../store/actions";
import { formatBRL } from "../../Utils";

export default function List() {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    page: 0,
    rows: 10,
    client_id: useSelector((state) => state.client),
  });

  const [globalFilterValue, setGlobalFilterValue] = useState({
    value: "",
    matchMode: FilterMatchMode.CONTAINS,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    setLoading(true);

    await list(filters)
      .then((res) => {
        let formatted = res.data.map((p) => ({ id: p.id, name: p.name, value: p.value, recurrency: p.recurrency }))
        setItems(formatted)
      })
      .catch((err) => {
        Swal.fire("Ops", "Houve um erro ao buscar a lista de produtos.", "error")
      })

    setLoading(false)
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={filters.search} onChange={onGlobalFilterChange} placeholder="Busque pelo nome" />
        </span>
      </div>
    )
  }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    setFilters({ ...filters, search: value })
    setGlobalFilterValue(value)
  }

  const deleteRecord = (id) => {
    remove(id)
      .catch((error) => {
        Swal.fire("Ops", "Houve um erro ao remover esse registro.", "error")
        return
      })
      .then((res) => {
        if (res.status == 200) {
          fetchData()
        }
      })
  }

  const actionBody = (rowData) => {
    return (
      <div style={{ maxWidth: 200 }} className="d-flex justify-content-between">
        <Link to={`/product/edit/${rowData.id}`} type="button" className="btn btn-primary">
          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
        </Link>
        <button type="button" className="btn btn-danger" onClick={(e) => { e.preventDefault(); deleteRecord(rowData.id) }}>
          <FontAwesomeIcon icon="fa-solid fa-trash" />
        </button>
      </div>
    )
  }

  const header = renderHeader()

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h1 className="screen-title">Produtos</h1>
        </div>
        <div className="body">
          <div className="database-header">
            <Link to={`/product/new`} type="button">
              <Button startIcon={<FontAwesomeIcon icon={faPlus} />} variant="contained" color="success">
                Novo produto
              </Button>
            </Link>
          </div>
          <div style={{ width: "100%" }}>
            <DataTable value={items} stripedRows showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }} filters={globalFilterValue} globalFilterFields={["name"]} header={header} emptyMessage="Não há registros.">
              <Column field="name" header="Nome"></Column>
              <Column field="value" header="Valor" body={row => formatBRL(row.value)}></Column>
              <Column field="recurrency" header="Recorrência" body={row => row.recurrency == 0 ? "Sem recorrência" : row.recurrency + " Dias"}></Column>
              <Column header="Opções" body={actionBody}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  )
}
