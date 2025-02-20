import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/posts", { withCredentials: true }).then((res) => setPosts(res.data));
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {posts.map((post) => (
                <div key={post.id}>{post.content}</div>
            ))}
        </div>
    );
};

export default Dashboard;
