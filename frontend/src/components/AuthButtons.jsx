const AuthButtons = () => {
    return (
        <div className="flex gap-4">
            <a href="http://localhost:5000/auth/google" className="bg-blue-500 text-white p-2 rounded">
                Iniciar sesión con Google
            </a>
        </div>
    );
};

export default AuthButtons;
