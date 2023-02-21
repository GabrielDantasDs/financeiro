import Login from "./pages/Login";
import Cliente from './pages/Clientes/Index';
import Dashboard from "./pages/Dashboard/Index";
import { useNavigate, Route, Routes } from "react-router-dom";
import { Nav } from "react-bootstrap";
import ProtectedRoute from "./utils/ProtecedRoute";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <Nav />
      <Routes>
        <Route
          path="/"
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
        <Route exact path="/auth" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
