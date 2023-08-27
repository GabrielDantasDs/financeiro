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
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//Não faz sentido usar redux aqui mas usei pra aprender a fazer
	const showSideBar = useSelector((state) => state.showSideBar.showSideBar);

	const handleClose = () => dispatch(closeSideBar());
	const handleShow = () => dispatch(openSideBar());

	useEffect(() => {
		const datajson = await fetch('itens.json')
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
		// <Offcanvas
		//   show={showSideBar}
		//   className="sidebar_offcanva"
		//   onHide={handleClose}
		//   backdrop={showCloseButton}
		//   enforceFocus={false}
		// >
		//   <Offcanvas.Header closeButton={showCloseButton} closeVariant="white">
		//     <Offcanvas.Title>
		//       <div className="sidebar_title">
		//         <h1>Financeiro</h1>
		//       </div>
		//     </Offcanvas.Title>
		//   </Offcanvas.Header>
		//   <Offcanvas.Body>
		//     <div className="sidebar_menu">
		//       {!cliente ? (
		//         <>
		//           <div
		//             onClick={(e) => setActive("dashboard")}
		//             className={
		//               active == "dashobard"
		//                 ? "sidebar_link active_link"
		//                 : "sidebar_link"
		//             }
		//           >
		//             <i className="fa fa-house"> </i>
		//             <Link to={`/dashboard`} type="button">
		//               Dashboard
		//             </Link>
		//           </div>

		//           <h2>PESSOAS</h2>
		//           <div
		//             onClick={() => setActive("clientes")}
		//             className={
		//               active == "clientes"
		//                 ? "sidebar_link active_link"
		//                 : "sidebar_link"
		//             }
		//           >
		//             <i className="fa fa-users"></i>
		//             <Link to={`/clientes/index`} type="button">
		//               Clientes
		//             </Link>
		//           </div>

		//           <h2>CONFIGURAÇÕES</h2>
		//           <div
		//             onClick={() => setActive("categorias")}
		//             className={
		//               active == "categorias"
		//                 ? "sidebar_link active_link"
		//                 : "sidebar_link"
		//             }
		//           >
		//             <i className="fa-regular fa-lightbulb"></i>
		//             <Link to={`/category/index`} type="button">
		//               Categorias
		//             </Link>
		//           </div>
		//         </>
		//       ) : (
		//         <>
		//           <div
		//             onClick={(e) => setActive("dashboard")}
		//             className={
		//               active == "dashobard"
		//                 ? "sidebar_link active_link"
		//                 : "sidebar_link"
		//             }
		//           >
		//             <i className="fa fa-house"> </i>
		//             <Link to={`/dashboard`} type="button">
		//               Dashboard
		//             </Link>
		//           </div>

		//           <h2>Finanças</h2>
		//           <div
		//             onClick={() => setActive("bankAccount")}
		//             className={
		//               active == "clientes"
		//                 ? "sidebar_link active_link"
		//                 : "sidebar_link"
		//             }
		//           >
		//             <i className="fa fa-bank"></i>
		//             <Link to={`/bank-account/index`} type="button">
		//               Conta bancária
		//             </Link>
		//           </div>
		//           <div
		//             onClick={() => setActive("financialTransaction")}
		//             className={
		//               active == "financialTransaction"
		//                 ? "sidebar_link active_link"
		//                 : "sidebar_link"
		//             }
		//           >
		//             <i className="fa fa-dollar-sign "></i>
		//             <Link to={`/financial-transaction/index`} type="button">
		//               Lançamentos
		//             </Link>
		//           </div>
		//           <div
		//             onClick={() => setActive("subscribers")}
		//             className={
		//               active == "subscribers"
		//                 ? "sidebar_link active_link"
		//                 : "sidebar_link"
		//             }
		//           >
		//             <i className="fa fa-users"></i>
		//             <Link to={`/subscriber/index`} type="button">
		//               Fornecedores/Clientes
		//             </Link>
		//           </div>
		//           <div
		//             onClick={() => setActive("report")}
		//             className={
		//               active == "report"
		//                 ? "sidebar_link active_link"
		//                 : "sidebar_link"
		//             }
		//           >
		//             <i className="fa fa-pie-chart"></i>
		//             <Link to={`/report/index`} type="button">
		//               Relatório
		//             </Link>
		//           </div>
		//           <div
		//             onClick={() => exitClient()}
		//             className={
		//               active == "sair" ? "sidebar_link active_link" : "sidebar_link"
		//             }
		//           >
		//             <i className="fa fa-left-arrow "></i>
		//             <Button>Sair do cliente</Button>
		//           </div>
		//         </>
		//       )}
		//     </div>
		//   </Offcanvas.Body>
		// </Offcanvas>
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
				<Item active={active == "dashboard" ? true : false} icon="house" name="Dashboard"/>
				{!cliente ? (
					<>
						<li
							onClick={(e) => setActive("dashboard")}
							className={
								active == "dashobard"
									? "sidebar_link active_link"
									: "sidebar_link"
							}
						>
							<i className="fa fa-house"> </i>
							<Link to={`/dashboard`} type="button" className="nav-link">
								Dashboardd
							</Link>
						</li>

						<li
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
						</li>

						<li
							onClick={() => setActive("categorias")}
							className={
								active == "categorias"
									? "sidebar_link active_link"
									: "sidebar_link"
							}
						>
							<i className="fa-regular fa-lightbulb"></i>
							<Link to={`/category/index`} type="button">
								Categorias
							</Link>
						</li>
					</>
				) : (
					<>
						<li className="nav-item">
							<div
								onClick={(e) => setActive("dashboard")}
								className={"sb-item"}
							>
								<i className="fa fa-house"> </i>
								<Link to={`/dashboard`} type="button" className={"sb-link"}>
									Dashboardd
								</Link>
							</div>
						</li>

						<li
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
						</li>
						<li
							onClick={() => setActive("financialTransaction")}
							className={
								active == "financialTransaction"
									? "sidebar_link active_link"
									: "sidebar_link"
							}
						>
							<i className="fa fa-dollar-sign "></i>
							<Link
								to={`/financial-transaction/index`}
								type="button"
							>
								Lançamentos
							</Link>
						</li>
						<li
							onClick={() => setActive("subscribers")}
							className={
								active == "subscribers"
									? "sidebar_link active_link"
									: "sidebar_link"
							}
						>
							<i className="fa fa-users"></i>
							<Link to={`/subscriber/index`} type="button">
								Fornecedores/Clientes
							</Link>
						</li>
						<li
							onClick={() => setActive("report")}
							className={
								active == "report"
									? "sidebar_link active_link"
									: "sidebar_link"
							}
						>
							<i className="fa fa-pie-chart"></i>
							<Link to={`/report/index`} type="button">
								Relatório
							</Link>
						</li>
						<li
							onClick={() => exitClient()}
							className={
								active == "sair"
									? "sidebar_link active_link"
									: "sidebar_link"
							}
						>
							<i className="fa fa-left-arrow "></i>
							<Button>Sair do cliente</Button>
						</li>
					</>
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
					{!cliente ? (
						<>
							<li
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
							</li>

							<li
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
							</li>

							<li
								onClick={() => setActive("categorias")}
								className={
									active == "categorias"
										? "sidebar_link active_link"
										: "sidebar_link"
								}
							>
								<i className="fa-regular fa-lightbulb"></i>
								<Link to={`/category/index`} type="button">
									Categorias
								</Link>
							</li>
						</>
					) : (
						<>
							<li
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
							</li>

							<li
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
							</li>
							<li
								onClick={() =>
									setActive("financialTransaction")
								}
								className={
									active == "financialTransaction"
										? "sidebar_link active_link"
										: "sidebar_link"
								}
							>
								<i className="fa fa-dollar-sign "></i>
								<Link
									to={`/financial-transaction/index`}
									type="button"
								>
									Lançamentos
								</Link>
							</li>
							<li
								onClick={() => setActive("subscribers")}
								className={
									active == "subscribers"
										? "sidebar_link active_link"
										: "sidebar_link"
								}
							>
								<i className="fa fa-users"></i>
								<Link to={`/subscriber/index`} type="button">
									Fornecedores/Clientes
								</Link>
							</li>
							<li
								onClick={() => setActive("report")}
								className={
									active == "report"
										? "sidebar_link active_link"
										: "sidebar_link"
								}
							>
								<i className="fa fa-pie-chart"></i>
								<Link to={`/report/index`} type="button">
									Relatório
								</Link>
							</li>
							<li
								onClick={() => exitClient()}
								className={
									active == "sair"
										? "sidebar_link active_link"
										: "sidebar_link"
								}
							>
								<i className="fa fa-left-arrow "></i>
								<Button>Sair do cliente</Button>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
}
