import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: "", content: "", isPublic: false });
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/auth/user", { withCredentials: true })
            .then((res) => setUser(res.data))
            .catch(() => setUser(null));

        axios.get("http://localhost:5000/posts", { withCredentials: true })
            .then((res) => setPosts(res.data))
            .catch((error) => console.error("Error al obtener posts:", error));
    }, []);

    const handleCreatePost = async () => {
        if (!user) {
            alert("Debes iniciar sesión para crear un post");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/posts",
                { ...newPost, authorId: user.id },
                { withCredentials: true }
            );
            setPosts([...posts, res.data]);
            setNewPost({ title: "", content: "", isPublic: false });
        } catch (error) {
            console.error("Error al crear post:", error.response?.data || error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-4">Dashboard</h2>

            {user ? (
                <p className="text-center text-gray-700">
                    Bienvenido, <span className="font-semibold">{user.name}</span>
                </p>
            ) : (
                <p className="text-center text-red-600">Inicia sesión para ver tu contenido</p>
            )}

            {/* Formulario de creación de posts */}
            <div className="bg-white shadow-md rounded p-4 my-4">
                <h3 className="text-xl font-semibold mb-2">Crear un nuevo post</h3>
                <input
                    type="text"
                    placeholder="Título"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full p-2 border rounded mb-2"
                />
                <textarea
                    placeholder="Contenido"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full p-2 border rounded mb-2"
                />
                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={newPost.isPublic}
                        onChange={(e) => setNewPost({ ...newPost, isPublic: e.target.checked })}
                        className="mr-2"
                    />
                    <label>Hacer público</label>
                </div>
                <button onClick={handleCreatePost} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Crear Post
                </button>
            </div>

            {/* Mostrar posts */}
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post.id} className="bg-gray-100 p-4 rounded shadow-md">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-gray-700">{post.content}</p>
                        <p className="text-sm text-gray-500">
                            <strong>Autor:</strong> {post.author?.name || "Desconocido"}
                        </p>
                        <p className={`text-xs ${post.isPublic ? "text-green-500" : "text-red-500"}`}>
                            {post.isPublic ? "Público" : "Privado"}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
