import { Link } from "react-router-dom";
import "../../style/sidebar.css";

export default function sideBar({ sidebarOpen, closeSidebar }) {
  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar_title">
        <h1>Financeiro</h1>
      </div>

      <div className="sidebar_menu">
        <div className="sidebar_link active_menu_link">
          <i className="fa fa-house"> </i>
          <a href="#">Home</a>
        </div>
        <h2>ADMIN</h2>
        <div className="sidebar_link">
          <i className="fa fa-tachometer"></i>
          <a href="#">Área administrativa</a>
        </div>

        <div className="sidebar_link">
          <i className="fa fa-building"></i>
          <a href="#">Lojas</a>
        </div>

        <div className="sidebar_link">
          <i className="fa fa-archive"></i>
          <a href="#">Produtos</a>
        </div>

        <div className="sidebar_link">
          <i className="fa fa-bars"></i>
          <a href="#">Categorias</a>
        </div>

        <div className="sidebar_link">
          <i className="fa fa-cutlery"></i>
          <a href="#">Pedidos</a>
        </div>

        <h2>PESSOAS</h2>
        <div className="sidebar_link">
          <i className="fa fa-male"></i>
          <a href="administradores">Administradores</a>
        </div>
        <div className="sidebar_link">
          <i className="fa fa-users"></i>
          <Link to={`/clientes/index`} type="button">Clientes</Link>
        </div>
      </div>
    </div>
  );
}
