import Login from "./pages/Login";
import Cliente from "./pages/Clientes/Index";
import Categoria from "./pages/Category/Index";
import Dashboard from "./pages/Dashboard/Index";
import DashboardClient from "./pages/DashboardClient/Index";
import BankAccount from "./pages/BankAccount/Index";
import Client from "./pages/Client/Index";
import Report from "./pages/Report/Index";
import CostCenter from "./pages/CostCenter/Index";
import Calendar from "./pages/Calendar/Index";
import FinancialTransaction from "./pages/FinancialTransaction/Index";
import { useNavigate, Route, Routes } from "react-router-dom";
import { Nav } from "react-bootstrap";
import ProtectedRoute from "./utils/ProtecedRoute";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";
import { useSelector } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/Sidebar";
import Register from "./pages/Register";
import OfxImport from "./pages/OfxImport/Index";
import ChatBot from "./pages/ChatBot/Index";
import Customer from "./pages/Customer/Index";
import Supplier from "./pages/Supplier/Index";

library.add(fas);

function App() {
	const navigate = useNavigate();
	//Corrigir isso aqui depois, não deve ser client
	const cliente = useSelector((state) => state.client);
	const auth = useSelector((state) => state.auth);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
			<div className="min-vh-100">
				{auth.isAuthenticated && <Navbar />}
				<div className="d-flex min-vh-100">
					{auth.isAuthenticated && <SideBar />}
					{cliente ? (
						<Routes>
							<Route
								path="/"
								element={<ProtectedRoute></ProtectedRoute>}
							></Route>
							<Route
								path="/dashboard/*"
								element={
									<ProtectedRoute>
										<DashboardClient />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/bank-account/*"
								element={
									<ProtectedRoute>
										<BankAccount />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/financial-transaction/*"
								element={
									<ProtectedRoute>
										<FinancialTransaction />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/import-ofx"
								element={
									<ProtectedRoute>
										<OfxImport />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/chat-bot"
								element={
									<ProtectedRoute>
										<ChatBot />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/clients/*"
								element={
									<ProtectedRoute>
										<Client />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/report/*"
								element={
									<ProtectedRoute>
										<Report />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/calendar/*"
								element={
									<ProtectedRoute>
										<Calendar />
									</ProtectedRoute>
								}
							/>
							<Route
								path="category/*"
								element={
									<ProtectedRoute>
										<Categoria />
									</ProtectedRoute>
								}
							/>
							<Route
								path="cost-center/*"
								element={
									<ProtectedRoute>
										<CostCenter />
									</ProtectedRoute>
								}
							/>
							<Route
								path="customer/*"
								element={
									<ProtectedRoute>
										<Customer />
									</ProtectedRoute>
								}
							/>
							<Route
								path="supplier/*"
								element={
									<ProtectedRoute>
										<Supplier />
									</ProtectedRoute>
								}
							/>
							<Route exact path="/auth" element={<Login />} />
							<Route
								exact
								path="/register"
								element={<Register />}
							/>
						</Routes>
					) : (
						<Routes>
							<Route
								path="/"
								element={<ProtectedRoute></ProtectedRoute>}
							></Route>
							<Route
								path="/dashboard/*"
								element={
									<ProtectedRoute>
										<Dashboard />
									</ProtectedRoute>
								}
							/>
							<Route
								path="client/*"
								element={
									<ProtectedRoute>
										<Client />
									</ProtectedRoute>
								}
							/>

							<Route exact path="/auth" element={<Login />} />
							<Route
								exact
								path="/register"
								element={<Register />}
							/>
						</Routes>
					)}
				</div>
			</div>
		</LocalizationProvider>
	);
}

export default App;
