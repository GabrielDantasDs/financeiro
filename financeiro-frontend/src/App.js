import Login from "./pages/Login";
import Cliente from "./pages/Clientes/Index";
import Categoria from "./pages/Categorias/Index";
import Dashboard from "./pages/Dashboard/Index";
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


library.add(fas);

function App() {
  const navigate = useNavigate();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <div>
        <Nav/>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
              </ProtectedRoute>
            }
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
          path="clientes/*" element=
          {
            <ProtectedRoute>
              <Cliente />
            </ProtectedRoute>
          }
          />
          <Route
            path="categorias/*"
            element={
              <ProtectedRoute>
                <Categoria />
              </ProtectedRoute>
            }
          />
          <Route exact path="/auth" element={<Login />} />
        </Routes>
      </div>
    </LocalizationProvider>
  );
}

export default App;
