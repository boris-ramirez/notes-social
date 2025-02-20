import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: "", content: "" });
    const [user, setUser] = useState(null); // Guardamos el usuario autenticado

    useEffect(() => {
        axios
            .get("http://localhost:5000/auth/user", { withCredentials: true })
            .then((res) => setUser(res.data))
            .catch((error) => console.error("Error al obtener usuario:", error));

        axios
            .get("http://localhost:5000/posts", { withCredentials: true })
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
                {
                    title: newPost.title,
                    content: newPost.content,
                    authorId: user.id, // Enviamos el ID del usuario autenticado
                },
                { withCredentials: true }
            );
            setPosts([...posts, res.data]);
        } catch (error) {
            console.error("Error al crear post:", error.response?.data || error);
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? <p>Bienvenido, {user.name}</p> : <p>Inicia sesión para ver tu contenido</p>}
            <div>
                <input
                    type="text"
                    placeholder="Título"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <textarea
                    placeholder="Contenido"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
                <button onClick={handleCreatePost}>Crear Post</button>
            </div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p><strong>Autor:</strong> {post.author?.name || "Desconocido"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
