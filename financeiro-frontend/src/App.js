import Login from "./pages/Login";
import Cliente from "./pages/Clientes/Index";
import Categoria from "./pages/Category/Index";
import Dashboard from "./pages/Dashboard/Index";
import BankAccount from "./pages/BankAccount/Index";
import Subscriber from "./pages/Subscriber/Index";
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
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/Sidebar";

library.add(fas);

function App() {
  const navigate = useNavigate();
  //Corrigir isso aqui depois, não deve ser client.client
  const cliente = useSelector((state) => state.client.client);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(auth);
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <div>
        <Navbar />
        {auth.isAuthenticated && <SideBar />}
        <Nav />
        {cliente ? (
          <Routes>
            <Route path="/" element={<ProtectedRoute></ProtectedRoute>}></Route>
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
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
              path="/subscriber/*"
              element={
                <ProtectedRoute>
                  <Subscriber />
                </ProtectedRoute>
              }
            />
            <Route exact path="/auth" element={<Login />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<ProtectedRoute></ProtectedRoute>}></Route>
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="clientes/*"
              element={
                <ProtectedRoute>
                  <Cliente />
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
            <Route exact path="/auth" element={<Login />} />
          </Routes>
        )}
      </div>
    </LocalizationProvider>
  );
}

export default App;
