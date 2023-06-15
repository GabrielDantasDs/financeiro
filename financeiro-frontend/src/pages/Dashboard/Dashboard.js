import "../../style/dashboard.css";
import hello from "../../assets/hello.png";
import { useEffect, useState } from "react";
import { get as getDashboard } from "../../cruds/dashbboard";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [user, setUser] = useState();
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
          setUser(res.data);
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
              <h1>Olá {user.cus_name}</h1>
              <p>Bem vindo ao seu painel</p>
            </div>
          </div>

          <div className="main_cards">
            <div className="card">
              <i className="fa fa-file-text fa-2x text-lightblue"></i>
              <div className="card_inner">
                <p className="text-primary-p">Número de clientes</p>
                <span className="font-bold text-title">578</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
