import { Link, useNavigate } from "react-router-dom";
import "../../style/sidebar.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { closeSideBar, openSideBar, unsetClient } from "../../store/actions";
import Item from "./Item";

export default function SideBar() {
	const [active, setActive] = useState("");
	//Corrigir isso aqui depois, não deve ser client.client
	const cliente = useSelector((state) => state.client.client);
	const [showCloseButton, setShowCloseButton] = useState(false);
	const [itensData, setItensData] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//Não faz sentido usar redux aqui mas usei pra aprender a fazer
	const showSideBar = useSelector((state) => state.showSideBar.showSideBar);

	const handleClose = () => dispatch(closeSideBar());
	const handleShow = () => dispatch(openSideBar());

	useEffect(() => {
		const fetchItensData = async () => {
			const res = await fetch("/itens.json");

			setItensData(await res.json());
		};

		fetchItensData();

		// Função para verificar o tamanho da tela e atualizar as classes do Offcanvas
		const handleScreenSize = () => {
			if (window.matchMedia("(min-width: 992px)").matches) {
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
		window.addEventListener("resize", handleScreenSize);

		// Limpar o listener quando o componente é desmontado
		return () => {
			window.removeEventListener("resize", handleScreenSize);
		};
	}, []);

	const exitClient = () => {
		setActive("sair");
		dispatch(unsetClient(null, navigate));
	};

	return (
		<div
			class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
			style={{ width: 280 }}
		>
			<a
				href="/"
				class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
			>
				<span class="fs-4">Financeiro</span>
			</a>
			<hr />
			<ul class="nav nav-pills flex-column mb-auto">
				{itensData?.map((item, i) => {
					return (
						<Item
							key={i}
							active={active == item.active ? true : false}
							icon={item.icon}
							name={item.name}
							url={item.url}
							clienteItem = {item.cliente}
							cliente={cliente}
						/>
					);
				})}
				{cliente && (
					<li className="sb-item">
						<Button variant="warning" onClick={() => exitClient()}>
							Sair do cliente
						</Button>
					</li>
				)}
			</ul>
			<hr />
			<div class="dropdown">
				<a
					href="#"
					class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<img
						src="https://github.com/mdo.png"
						alt=""
						width="32"
						height="32"
						class="rounded-circle me-2"
					/>
					<strong>mdo</strong>
				</a>
				<ul class="dropdown-menu dropdown-menu-dark text-small shadow">
					{itensData?.map((item, i) => {
						return (
							<Item
								key={i}
								active={active == item.active ? true : false}
								icon={item.icon}
								name={item.name}
								url={item.url}
								cliente={cliente}
							/>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
