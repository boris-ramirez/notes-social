import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const res = await axios.post("http://localhost:5000/auth/login", form, { withCredentials: true });
            alert("Inicio de sesión exitoso");
            navigate("/dashboard");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Error al iniciar sesión");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
                type="email"
                placeholder="Correo"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border p-2"
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="border p-2"
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button className="bg-green-500 text-white p-2">Iniciar sesión</button>
        </form>
    );
};

export default LoginForm;
