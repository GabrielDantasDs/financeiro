import "../../style/navbar.css";
import Avatar from "../../assets/avatar.png";
import { Dropdown } from "react-bootstrap";
import { logout as logoutAuth } from "../../cruds/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { openSideBar } from "../../store/actions";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowSideBar = () => dispatch(openSideBar());

  const logout = () => {
    dispatch(logoutAuth(navigate));
  };

  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => handleShowSideBar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>

      <div className="navbar_left">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/client">Clientes</Link>
      </div>

      <div className="navbar_right ml-auto">
        <Dropdown>
          <Dropdown.Toggle as={"div"} id="dropdown-basic">
            <img width={30} src={Avatar} alt="avatar" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => { e.preventDefault(); logout(); }}>Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
}
