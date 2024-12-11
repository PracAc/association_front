

import NoticeListComponent from "../../components/notice/NoticeListComponent.tsx";
import AdminMainLayout from "../../layouts/AdminMainLayout.tsx";


function NoticeListPage() {
    return (
        <AdminMainLayout>
            <div className="container mx-auto">
                <NoticeListComponent />
            </div>
        </AdminMainLayout>
    );
}

export default NoticeListPage;