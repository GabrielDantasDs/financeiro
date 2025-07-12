import "../../style/dashboard-client.css";
import hello from "../../assets/hello.png";
import { useEffect, useState } from "react";
import { getDashboardClient as getDashboard } from "../../cruds/dashbboard";
import Swal from "sweetalert2";
import { formatCurrency } from "../../Utils";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [user, setUser] = useState();
  const client = useSelector((state) => state.client);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      await getDashboard(client)
        .catch((err) => {
          Swal.fire(
            "Atenção!",
            "Houve um erro ao buscar os dados da dashboard",
            "error"
          );
        })
        .then((res) => {
          setData(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    fetchData();
  }, []);

  return (
    <>
      {!loading && (
        <div className="main">
          <div className="main_title">
            <img src={hello} alt="hello" />
            <div className="main_greeting">
              <p>Bem vindo ao seu painel</p>
            </div>
          </div>

          <div className="main_cards">
            <div className="card">
              <i className="fa fa-money-bill fa-2x text-green"></i>
              <div className="card_inner">
                <span className="text-primary-p">Receita Total</span>
                <span className="font-bold text-title">{formatCurrency(data.receitaSum)}</span>
              </div>
            </div>

            <div className="card">
              <i className="fa fa-credit-card fa-2x text-red"></i>
              <div className="card_inner">
                <span className="text-primary-p">Despesas Totais</span>
                <span className="font-bold text-title">{formatCurrency(data.despesaSum)}</span>
              </div>
            </div>

            <div className="card">
              <i className="fa fa-line-chart fa-2x text-purple"></i>
              <div className="card_inner">
                <span className="text-primary-p">Saldo</span>
                <span className="font-bold text-title">{formatCurrency(data.receitaSum - data.despesaSum)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
