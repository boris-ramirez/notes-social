import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/auth/login", form);
            alert("Inicio de sesión exitoso");
            console.log(res.data);
        } catch (error) {
            alert("Error al iniciar sesión");
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
            <button className="bg-green-500 text-white p-2">Iniciar sesión</button>
        </form>
    );
};

export default LoginForm;
