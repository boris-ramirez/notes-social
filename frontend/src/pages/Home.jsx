import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthButtons from "../components/AuthButtons";
import LoginForm from "../components/LoginForm";

const Home = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // ⏳ Estado de carga
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/auth/user", { withCredentials: true })
            .then((res) => {
                setUser(res.data);
                navigate("/dashboard"); // 🚀 Redirigir automáticamente
            })
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false)); // ⚡ Desactivamos la carga
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-lg">Cargando...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Bienvenido a Notes Social</h1>
            <p className="mt-2">Inicia sesión con Google o con tu cuenta</p>

            <div className="mt-4">
                <AuthButtons />
            </div>

            <div className="mt-4">
                <LoginForm />
            </div>

            <p className="mt-4">
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-blue-500">Regístrate aquí</Link>
            </p>

            <p className="mt-2">
                ¿Olvidaste tu contraseña?{" "}
                <Link to="/reset-password" className="text-blue-500">Recupérala aquí</Link>
            </p>
        </div>
    );
};

export default Home;
