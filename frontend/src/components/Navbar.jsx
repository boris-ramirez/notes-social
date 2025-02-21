import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/auth/user", { withCredentials: true })
            .then((res) => setUser(res.data))
            .catch(() => setUser(null));
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:5000/auth/logout", { withCredentials: true });
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">Notes Social</Link>
                <div className="flex space-x-4">
                    {user && <Link to="/dashboard" className="hover:underline">Dashboard</Link>}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            Cerrar Sesión
                        </button>
                    ) : null}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
