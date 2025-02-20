import ResetForm from "../components/ResetForm";

const ResetPassword = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Restablecer Contraseña</h1>
            <ResetForm />
        </div>
    );
};

export default ResetPassword;
