import NoticeAddComponent from "../../components/notice/NoticeAddComponent.tsx";
import AdminMainLayout from "../../layouts/AdminMainLayout.tsx";



function NoticeAddPage() {
    return (
        <AdminMainLayout>
            <div className="container mx-auto">
                <NoticeAddComponent/>
            </div>
        </AdminMainLayout>
    );
}

export default NoticeAddPage;