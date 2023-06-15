import { Link } from "react-router-dom";
import "../../style/sidebar.css";
import { useState } from "react";

export default function SideBar({ sidebarOpen, closeSidebar }) {
  const [active, setActive] = useState("");

  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar_title">
        <h1>Financeiro</h1>
      </div>

      <div className="sidebar_menu">
        <div
          onClick={(e) => setActive("dashboard")}
          className={
            active == "dashobard" ? "sidebar_link active_link" : "sidebar_link"
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
            active == "clientes" ? "sidebar_link active_link" : "sidebar_link"
          }
        >
          <i className="fa fa-users"></i>
          <Link to={`/clientes/index`} type="button">
            Clientes
          </Link>
        </div>
      </div>
    </div>
  );
}
