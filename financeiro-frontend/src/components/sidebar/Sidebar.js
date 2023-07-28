import { Link, useNavigate } from "react-router-dom";
import "../../style/sidebar.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { closeSideBar, openSideBar, unsetClient } from "../../store/actions";

export default function SideBar() {
  const [active, setActive] = useState("");
  //Corrigir isso aqui depois, não deve ser client.client
  const cliente = useSelector((state) => state.client.client);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Não faz sentido usar redux aqui mas usei pra aprender a fazer
  const showSideBar = useSelector((state) => state.showSideBar.showSideBar);
  
  const handleClose = () => dispatch(closeSideBar());
  const handleShow = () => dispatch(openSideBar());

  useEffect(() => {
    // Função para verificar o tamanho da tela e atualizar as classes do Offcanvas
    const handleScreenSize = () => {
      if (window.matchMedia('(min-width: 992px)').matches) {
        // Se a tela for grande (>= 992px), exiba o Offcanvas como uma sidebar
        handleShow();
        setShowCloseButton(false);
      } else {
        // Se a tela for pequena (< 992px), remova a classe de sidebar para exibir o Offcanvas sem backdrop
        handleClose();
        setShowCloseButton(true);
      }
    };

    // Verificar o tamanho da tela quando o componente é montado
    handleScreenSize();

    // Adicionar um listener para atualizar o tamanho da tela quando a janela for redimensionada
    window.addEventListener('resize', handleScreenSize);
    
    // Limpar o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', handleScreenSize);
    };
  }, []);

  const exitClient = () => {
    setActive("sair");
    dispatch(unsetClient(null, navigate));
  };

  return (
    <Offcanvas
      show={showSideBar}
      className="sidebar_offcanva"
      onHide={handleClose}
      backdrop={false}
    >
      <Offcanvas.Header closeButton={showCloseButton} closeVariant="white">
        <Offcanvas.Title>
          <div className="sidebar_title">
            <h1>Financeiro</h1>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
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
      </Offcanvas.Body>
    </Offcanvas>
    // <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
    //
    //   </div>
    // </div>
  );
}
