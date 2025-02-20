import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/auth/register", form);
            alert("Registro exitoso. Inicia sesión.");
        } catch (error) {
            alert("Error al registrar usuario");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
                type="text"
                placeholder="Nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-2"
            />
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
            <button className="bg-blue-500 text-white p-2">Registrarse</button>
        </form>
    );
};

export default RegisterForm;
