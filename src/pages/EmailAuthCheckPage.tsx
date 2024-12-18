import EmailAuthCheckComponent from "../components/EmailAuthCheckComponent.tsx";
import MainLayout from "../layouts/MainLayout.tsx";


function EmailAuthCheckPage() {
    return (
        <MainLayout>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <EmailAuthCheckComponent/>
            </div>
        </MainLayout>
    );
}

export default EmailAuthCheckPage;