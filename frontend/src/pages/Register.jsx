import RegisterForm from "../components/RegisterForm";

const Register = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Regístrate</h1>
            <RegisterForm />
        </div>
    );
};

export default Register;
