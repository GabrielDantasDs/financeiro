import React, { useEffect, useState } from "react";
import "../style/componentToPrint.css";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import dayjs from "dayjs";
import { getChartsData} from '../cruds/finantial_transaction';

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (props.data) {
      setData(props.data);
      const [entradas_porcentagem, saidas_porcentagem] = getChartsData(props.cliente_id);

      const ctx = document.getElementById("profitChart").getContext("2d");
      const ctxb = document.getElementById("expensesChart").getContext("2d");
      const profitsChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
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
              display: false,
            },
            datalabels: {
              font: {
                size: 18,
              },
              color: "black",
              anchor: "center",
              align: "top",
              formatter: function (value) {
                return value + " Votes";
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
      const expensesChart =  new Chart(ctxb, {
        type: "doughnut",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
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
              display: false,
            },
            datalabels: {
              font: {
                size: 18,
              },
              color: "black",
              anchor: "center",
              align: "top",
              formatter: function (value) {
                return value + " Votes";
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
    }
  }, [props.data]);

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
          <div style={{ pageBreakAfter: "always", display: "flex", justifyContent: "space-between" }}>
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
                  <th>Column 1</th>
                  <th>Column 2</th>
                  <th>Column 3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
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
                </tr>
              </tbody>
            </table>
          </div>
        </>
    </div>
  );
});
