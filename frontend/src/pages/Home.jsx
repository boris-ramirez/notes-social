import AuthButtons from "../components/AuthButtons";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Bienvenido a Notes Social</h1>
            <p className="mt-2">Inicia sesión con Google o con tu cuenta</p>

            {/* Botones de autenticación */}
            <div className="mt-4">
                <AuthButtons />
            </div>

            {/* Formulario de inicio de sesión normal */}
            <div className="mt-4">
                <LoginForm />
            </div>

            {/* Enlace para registrarse sin Google */}
            <p className="mt-4">
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-blue-500">Regístrate aquí</Link>
            </p>

            {/* Enlace para recuperar contraseña */}
            <p className="mt-2">
                ¿Olvidaste tu contraseña?{" "}
                <Link to="/reset-password" className="text-blue-500">Recupérala aquí</Link>
            </p>
        </div>
    );
};

export default Home;
