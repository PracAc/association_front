import RegisterComponent from "../components/RegisterComponent.tsx";
import MainLayout from "../layouts/MainLayout.tsx";

function RegisterPage() {
    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <RegisterComponent/>
            </div>
        </MainLayout>
    );
}

export default RegisterPage;