import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar"; // Agregar el Navbar

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para manejar el "cargando"

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false)); // 🔥 Evita que se muestre Home antes de saber si hay usuario
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Cargando...
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} /> {/* Pasar usuario al Navbar */}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/reset-password"
          element={user ? <Navigate to="/dashboard" /> : <ResetPassword />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
