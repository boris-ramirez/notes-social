import { useState } from "react";
import axios from "axios";

const ResetForm = () => {
    const [email, setEmail] = useState("");

    const handleReset = async () => {
        try {
            await axios.post("http://localhost:5000/auth/forgot-password", { email });
            alert("Correo de restablecimiento enviado.");
        } catch (error) {
            alert("Error al enviar el correo.");
        }
    };

    return (
        <div>
            <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2"
            />
            <button onClick={handleReset} className="bg-blue-500 text-white p-2">
                Enviar enlace de recuperación
            </button>
        </div>
    );
};

export default ResetForm;
