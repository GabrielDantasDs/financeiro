import { Link, useNavigate } from "react-router-dom";
import "../../style/sidebar.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { unsetClient } from "../../store/actions";

export default function SideBar({ sidebarOpen, closeSidebar }) {
  const [active, setActive] = useState("");
  //Corrigir isso aqui depois, não deve ser client.client
  const cliente = useSelector((state) => state.client.client);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exitClient = () => {
    setActive("sair");
    dispatch(unsetClient(null, navigate));
  };

  useEffect(() => {
    console.log(cliente);
  }, [cliente]);

  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar_title">
        <h1>Financeiro</h1>
      </div>

      <div className="sidebar_menu">
        {!cliente ? (
          <>
            <div
              onClick={(e) => setActive("dashboard")}
              className={
                active == "dashobard"
                  ? "sidebar_link active_link"
                  : "sidebar_link"
              }
            >
              <i className="fa fa-house"> </i>
              <Link to={`/dashboard`} type="button">
                Dashboard
              </Link>
            </div>

            <h2>PESSOAS</h2>
            <div
              onClick={() => setActive("clientes")}
              className={
                active == "clientes"
                  ? "sidebar_link active_link"
                  : "sidebar_link"
              }
            >
              <i className="fa fa-users"></i>
              <Link to={`/clientes/index`} type="button">
                Clientes
              </Link>
            </div>
          </>
        ) : (
          <>
            <div
              onClick={(e) => setActive("dashboard")}
              className={
                active == "dashobard"
                  ? "sidebar_link active_link"
                  : "sidebar_link"
              }
            >
              <i className="fa fa-house"> </i>
              <Link to={`/dashboard`} type="button">
                Dashboard
              </Link>
            </div>

            <h2>Finanças</h2>
            <div
              onClick={() => setActive("bankAccount")}
              className={
                active == "clientes"
                  ? "sidebar_link active_link"
                  : "sidebar_link"
              }
            >
              <i className="fa fa-bank"></i>
              <Link to={`/bank-account/index`} type="button">
                Conta bancária
              </Link>
            </div>
            <div
              onClick={() => setActive("financialTransaction")}
              className={
                active == "financialTransaction"
                  ? "sidebar_link active_link"
                  : "sidebar_link"
              }
            >
              <i className="fa fa-dollar-sign "></i>
              <Link to={`/financial-transaction/index`} type="button">
                Lançamentos
              </Link>
            </div>
            <div
              onClick={() => exitClient()}
              className={
                active == "sair" ? "sidebar_link active_link" : "sidebar_link"
              }
            >
              <i className="fa fa-left-arrow "></i>
              <Button>Sair do cliente</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
