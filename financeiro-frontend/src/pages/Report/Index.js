import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { list } from "../../cruds/finantial_transaction";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

export default function Report() {
  const [financialTransactions, setFinancialTransactions] = useState([]);
  const client = useSelector((state) => state.client.client);
  const products = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
  ];

  useEffect(() => {
    list(client)
      .catch((err) => {
        Swal.fire(
          "Ops",
          "Houve um erro ao buscar a lista de lançamentos.",
          "error"
        );
      })
      .then((res) => {
        setFinancialTransactions(res.data);
      });
  }, []);

  return (
    <div>
      <Card>
        <Card.Body>This is some text within a card body.</Card.Body>
      </Card>

      <div className="card">
        <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>
      </div>
    </div>
  );
}
