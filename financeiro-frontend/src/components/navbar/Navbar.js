import "../../style/navbar.css";
import Avatar from "../../assets/avatar.png";
import { Dropdown } from "react-bootstrap";
import { logout as logoutAuth } from "../../cruds/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function Navbar({ sidebarOpen, openSidebar }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const logout = () => {
        dispatch(logoutAuth(navigate));
    };

  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>

      <div className="navbar_left">
        {/* <a href="#">Produtos</a>
                <a href="#">Usuários</a> */}
        <a href="#" className="active_link">
          Admin
        </a>
      </div>

      <div className="navbar_right">
        <a href="#">
          <i className="fa fa-search"></i>
        </a>

        <a href="#">
          <i className="fa fa-clock-o"></i>
        </a>

        <Dropdown>
          <Dropdown.Toggle as={"div"} id="dropdown-basic">
            <img width={30} src={Avatar} alt="avatar" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => {e.preventDefault(); logout()}}>Sair</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
}
