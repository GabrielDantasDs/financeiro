import "../../style/dashboard-client.css";
import hello from "../../assets/hello.png";
import { useEffect, useState } from "react";
import { get as getDashboard } from "../../cruds/dashbboard";
import Swal from "sweetalert2";
import { formatCurrency } from "../../Utils";

export default function Dashboard() {
  const [user, setUser] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      await getDashboard()
        .catch((err) => {
          Swal.fire(
            "Atenção!",
            "Houve um erro ao buscar os dados da dashboard",
            "error"
          );
        })
        .then((res) => {
          setUser(res.data.user);
          setData(res.data.dashboardData);
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
              <h1>Olá {user.name}</h1>
              <p>Bem vindo ao seu painel</p>
            </div>
          </div>
k
          <div className="main_cards">
            <div className="card">
              <i className="fa fa-money-bill fa-2x text-green"></i>
              <div className="card_inner">
                <span className="text-primary-p">Receita Total</span>
                <span className="font-bold text-title">{formatCurrency(data.totalRevenue)}</span>
              </div>
            </div>

            <div className="card">
              <i className="fa fa-credit-card fa-2x text-red"></i>
              <div className="card_inner">
                <span className="text-primary-p">Despesas Totais</span>
                <span className="font-bold text-title">{formatCurrency(data.totalExpenses)}</span>
              </div>
            </div>

            <div className="card">
              <i className="fa fa-line-chart fa-2x text-yellow"></i>
              <div className="card_inner">
                <span className="text-primary-p">Lucro Líquido</span>
                <span className="font-bold text-title">{formatCurrency(data.netProfit)}</span>
              </div>
            </div>

            <div className="card">
              <i className="fa fa-calendar fa-2x text-purple"></i>
              <div className="card_inner">
                <span className="text-primary-p">Transações este mês</span>
                <span className="font-bold text-title">{data.monthlyTransactions}</span>
              </div>
            </div>

            <div className="card">
              <i className="fa fa-clock fa-2x text-blue"></i>
              <div className="card_inner">
                <span className="text-primary-p">Próximo Vencimento</span>
                <span className="font-bold text-title">{data.nextDueDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
