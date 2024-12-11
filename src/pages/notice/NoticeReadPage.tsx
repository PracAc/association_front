
import NoticeReadComponent from "../../components/notice/NoticeReadComponent.tsx";
import AdminMainLayout from "../../layouts/AdminMainLayout.tsx";


function NoticeReadPage() {
    return (
        <AdminMainLayout>
            <div className="container mx-auto">
                <NoticeReadComponent />
            </div>
        </AdminMainLayout>
    );
}

export default NoticeReadPage;