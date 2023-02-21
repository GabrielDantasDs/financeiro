import '../../style/navbar.css';
import Avatar from '../../assets/avatar.png';

export default function Navbar({ sidebarOpen, openSidebar }) {
    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i className="fa fa-bars" aria-hidden="true"></i>
            </div>

            <div className="navbar_left">
                <a href="#">Produtos</a>
                <a href="#">Usuários</a>
                <a href="#" className="active_link">Admin</a>
            </div>
            
            <div className="navbar_right">
                <a href="#">
                    <i className="fa fa-search"></i>
                </a>

                <a href="#">
                    <i className="fa fa-clock-o"></i>
                </a>

                <a href="#">
                   <img width={30} src={Avatar} alt="avatar" />
                </a>
            </div>

        </nav>
    )
}