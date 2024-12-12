import RegisterComponent from "../components/RegisterComponent.tsx";
import BasicLayout from "../layouts/MainLayout.tsx";



function RegisterPage() {
    return (

    <BasicLayout>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <RegisterComponent/>
        </div>
    </BasicLayout>
            );
            }

            export default RegisterPage;