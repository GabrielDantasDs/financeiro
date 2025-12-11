import React, { useEffect, useState } from "react";
import "../style/componentToPrint.css";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const [data, setData] = useState({});
  const [categorias_entrada_porcentagem, setCategoriasEntradaPorcentagem] =
    useState([]);
  const [categorias_saida_porcentagem, setCategoriasSaidaPorcentagem] =
    useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     let response = await getChartsData(props.data.cliente.id)
  //       .catch((err) => {
  //         Swal.fire(
  //           "Ops",
  //           "Houve um erro ao buscar os dados do cliente.",
  //           "error"
  //         );
  //         return;
  //       })
  //       .then((res) => {
  //         setCategoriasEntradaPorcentagem(res.data[0]);
  //         setCategoriasSaidaPorcentagem(res.data[1]);
  //       });

  //     return response;
  //   }

  //   if (props.data) {
  //     setData(props.data);
  //     fetchData();
  //   }
  // }, [props.data]);

  useEffect(() => {
    let categories_profit = [];
    let values_profit = [];
    let categories_expenses = [];
    let values_expenses = [];

    categorias_entrada_porcentagem.map((category, i) => {
      categories_profit.push(category["categoria"]);
      values_profit.push(category["porcentagem"]);
    });

    categorias_saida_porcentagem.map((category, i) => {
      categories_expenses.push(category["categoria"]);
      values_expenses.push(Number(category["porcentagem"]).toFixed(2));
    });

    const ctx = document.getElementById("profitChart").getContext("2d");
    const ctxb = document.getElementById("expensesChart").getContext("2d");
    const profitsChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: categories_profit,
        datasets: [
          {
            label: "Porcentagem de categorias",
            data: values_profit,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
          datalabels: {
            font: {
              size: 18,
            },
            color: "black",
            anchor: "center",
            align: "top",
            formatter: function (value) {
              return value + " %";
            },
          },
          renderer: {
            clear: false,
            async: true,
            onComplete: function (chart, args, options) {
              const img = chart.canvas.toDataURL("image/png");
              const a = document.createElement("a");
              a.href = img;
              a.download = "chart.png";
              a.click();
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
    const expensesChart = new Chart(ctxb, {
      type: "doughnut",
      data: {
        labels: categories_expenses,
        datasets: [
          {
            label: "Porcentagem categorias",
            data: values_expenses,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
          datalabels: {
            font: {
              size: 18,
            },
            color: "black",
            anchor: "center",
            align: "top",
            formatter: function (value) {
              return value + "%";
            },
          },
          renderer: {
            clear: false,
            async: true,
            onComplete: function (chart, args, options) {
              const img = chart.canvas.toDataURL("image/png");
              const a = document.createElement("a");
              a.href = img;
              a.download = "chart.png";
              a.click();
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
    return () => {
      profitsChart.destroy();
      expensesChart.destroy();
    };
  }, [categorias_entrada_porcentagem, categorias_saida_porcentagem]);

  return (
    <div
      ref={ref}
      style={{ width: "400px", height: "400px" }}
      className="container print-container"
    >
      <>
        <div className="page-header">
          <h1>Relatório Financeiro</h1>
          <div className="sub-header">
            <p>{data?.cliente?.cus_name}</p>
            <p>Data: {dayjs().format("DD/MM/YYYY")}</p>
          </div>
        </div>
        <div
          style={{
            pageBreakAfter: "always",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <canvas id="profitChart" width="400" height="400"></canvas>
          <canvas id="expensesChart" width="400" height="400"></canvas>
        </div>
        <div style={{ pageBreakAfter: "always" }}>
          <div className="page-header">
            <h1>Client Report</h1>
            <p>Today's Date: [Insert Date Here]</p>
            <p>Client Name: [Insert Client Name Here]</p>
          </div>
          <table
            style={{ border: "1px solid black", width: "105%" }}
            className="table-report"
          >
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Nota</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {data?.finantials?.map((fin, i) => {
                return (
                  <tr>
                    <td>{fin.fin_type}</td>
                    <td>
                      {Number(fin.fin_value).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td>{fin.fin_category?.cat_name}</td>
                    <td>{fin.fin_note}</td>
                    <td>{dayjs(fin.fin_date).format("YYYY-MM-DD")}</td>
                  </tr>
                );
              })}
              {/* <tr>
                <td>Row 1, Column 1</td>
                <td>Row 1, Column 2</td>
                <td>Row 1, Column 3</td>
              </tr>
              <tr>
                <td>Row 2, Column 1</td>
                <td>Row 2, Column 2</td>
                <td>Row 2, Column 3</td>
              </tr>
              <tr>
                <td>Row 3, Column 1</td>
                <td>Row 3, Column 2</td>
                <td>Row 3, Column 3</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
});
